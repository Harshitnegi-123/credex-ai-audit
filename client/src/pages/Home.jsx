import { useState } from "react";
import axios from "axios";

const TOOLS = ["ChatGPT", "Claude", "Cursor", "Midjourney", "GitHub Copilot"];
const PLANS = ["Plus", "Team", "Pro", "Business"];

const Home = () => {
    const [auditResult, setAuditResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem("auditForm");
        return saved ? JSON.parse(saved) : {
            toolName: "", plan: "", monthlySpend: "", seats: ""
        };
    });

    const handleChange = (e) => {
        const updated = { ...formData, [e.target.name]: e.target.value };
        setFormData(updated);
        localStorage.setItem("auditForm", JSON.stringify(updated));
    };

    const handleSubmit = async () => {
        if (!formData.toolName || !formData.plan || !formData.monthlySpend || !formData.seats) {
            alert("Please fill all fields");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/api/audit", { tools: [formData] });
            setAuditResult(response.data);
            console.log(response.data.shareId);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const hasRecs = auditResult?.recommendations?.length > 0;

    return (
        <div className="min-h-screen bg-[#F7F6F2] flex flex-col items-center px-6 py-12">

            <div className="text-center mb-10">
                <h1 className="text-3xl font-semibold text-[#1A1A1A] tracking-tight mb-1">AI Spend Audit</h1>
                <p className="text-sm text-[#888]">Find savings on your AI tool subscriptions</p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E6DF] p-8 w-full max-w-md">

                {/* ── Result Section ── */}
                {auditResult && (
                    <>
                        <p className="text-[11px] font-medium text-[#888] uppercase tracking-widest mb-4">Audit result</p>
                        <div className="grid grid-cols-2 gap-3 mb-5">
                            <div className="bg-[#F2F0EA] rounded-xl px-4 py-3 text-center">
                                <p className="text-[11px] text-[#888] uppercase tracking-wide mb-1">Monthly savings</p>
                                <p className="text-2xl font-semibold text-[#1A1A1A]">${auditResult.totalMonthlySavings}</p>
                            </div>
                            <div className="bg-[#F2F0EA] rounded-xl px-4 py-3 text-center">
                                <p className="text-[11px] text-[#888] uppercase tracking-wide mb-1">Yearly savings</p>
                                <p className="text-2xl font-semibold text-[#1A1A1A]">${auditResult.totalYearlySavings}</p>
                            </div>
                        </div>

                        {/* Recommendation Cards */}
                        {hasRecs ? (
                            auditResult.recommendations.map((item, i) => (
                                <div key={i} className="border border-[#E8E6DF] rounded-xl p-4 mb-3">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-semibold text-[#1A1A1A]">{item.tool}</p>
                                        <span className="text-[11px] bg-[#F2F0EA] text-[#666] px-3 py-1 rounded-full">Recommended</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs bg-[#F7F6F2] border border-[#E0DDDA] text-[#555] px-2 py-0.5 rounded">{item.currentPlan}</span>
                                        <span className="text-[#C0BDB8]">→</span>
                                        <span className="text-xs bg-[#1A1A1A] text-white px-2 py-0.5 rounded">{item.recommendedPlan}</span>
                                    </div>
                                    <p className="text-sm text-[#666] leading-relaxed mb-2">{item.reason}</p>
                                    <div className="flex gap-4 pt-2 border-t border-[#F0EDE7]">
                                        <p className="text-xs text-[#888]">Monthly <span className="font-semibold text-[#1A1A1A]">${item.monthlySavings}</span></p>
                                        <p className="text-xs text-[#888]">Yearly <span className="font-semibold text-[#1A1A1A]">${item.yearlySavings}</span></p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            /* ── Empty State ── */
                            <div className="text-center py-8 px-4">
                                <div className="text-3xl mb-3">✓</div>
                                <h3 className="font-semibold text-[#1A1A1A] mb-2">You're already optimized</h3>
                                <p className="text-sm text-[#888] leading-relaxed">Your current setup appears to be the best fit. No cost-saving recommendations at this time.</p>
                            </div>
                        )}

                        {/* ── AI Summary Card ── */}
                        <div className="bg-[#F7F6F2] border border-[#E8E6DF] rounded-2xl p-5 mt-2">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 rounded-full bg-[#1A1A1A]" />
                                <span className="text-[11px] font-semibold text-[#1A1A1A] uppercase tracking-wide">AI Summary</span>
                            </div>
                            <p className="text-sm text-[#555] leading-relaxed">
                                {hasRecs
                                    ? `Based on your ${formData.toolName} usage on the ${formData.plan} plan, switching to a lighter tier could save you $${auditResult.totalYearlySavings}/year. Unused seats are the most common source of AI overspend.`
                                    : `Your current ${formData.toolName} setup looks well-optimized. No changes recommended right now.`
                                }
                            </p>
                        </div>

                        <div className="h-px bg-[#EDEBE6] my-7" />
                    </>
                )}

                {/* ── Form ── */}
                <div className="mb-4">
                    <label className="text-[11px] font-medium text-[#888] uppercase tracking-widest block mb-1.5">Tool name</label>
                    <select name="toolName" value={formData.toolName} onChange={handleChange}
                        className="w-full px-3.5 py-2.5 border border-[#E0DDDA] rounded-xl bg-[#FAFAF8] text-[#1A1A1A] text-sm outline-none focus:border-[#1A1A1A] focus:bg-white transition-all appearance-none cursor-pointer">
                        <option value="">Select a tool</option>
                        {TOOLS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="text-[11px] font-medium text-[#888] uppercase tracking-widest block mb-1.5">Current plan</label>
                    <select name="plan" value={formData.plan} onChange={handleChange}
                        className="w-full px-3.5 py-2.5 border border-[#E0DDDA] rounded-xl bg-[#FAFAF8] text-[#1A1A1A] text-sm outline-none focus:border-[#1A1A1A] focus:bg-white transition-all appearance-none cursor-pointer">
                        <option value="">Select a plan</option>
                        {PLANS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                        <label className="text-[11px] font-medium text-[#888] uppercase tracking-widest block mb-1.5">Monthly spend ($)</label>
                        <input name="monthlySpend" value={formData.monthlySpend} onChange={handleChange} type="number" placeholder="120"
                            className="w-full px-3.5 py-2.5 border border-[#E0DDDA] rounded-xl bg-[#FAFAF8] text-[#1A1A1A] text-sm placeholder-[#C0BDB8] outline-none focus:border-[#1A1A1A] focus:bg-white transition-all" />
                    </div>
                    <div>
                        <label className="text-[11px] font-medium text-[#888] uppercase tracking-widest block mb-1.5">Seats</label>
                        <input name="seats" value={formData.seats} onChange={handleChange} type="number" placeholder="2"
                            className="w-full px-3.5 py-2.5 border border-[#E0DDDA] rounded-xl bg-[#FAFAF8] text-[#1A1A1A] text-sm placeholder-[#C0BDB8] outline-none focus:border-[#1A1A1A] focus:bg-white transition-all" />
                    </div>
                </div>

                <button onClick={handleSubmit} disabled={loading}
                    className="w-full py-3 bg-[#1A1A1A] text-white text-sm font-medium rounded-xl mt-2 hover:opacity-85 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {loading && (
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="3" />
                            <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                        </svg>
                    )}
                    {loading ? "Analyzing..." : "Run audit"}
                </button>
            </div>
        </div>
    );
};

export default Home;