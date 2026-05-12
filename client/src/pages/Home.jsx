import { useState } from "react";
import axios from "axios";
import { generateSummary } from "../../../server/utils/generateSummary";

const TOOLS_CONFIG = {
    "ChatGPT": ["Plus", "Team", "Enterprise"],
    "Claude": ["Pro", "Team", "Enterprise"],
    "Cursor": ["Pro", "Business"],
    "GitHub Copilot": ["Individual", "Business", "Enterprise"],
    "Midjourney": ["Basic", "Standard", "Pro", "Mega"],
    "Perplexity": ["Pro", "Business"],
    "Notion AI": ["Plus", "Business"],
    "Grammarly": ["Premium", "Business"],
    "Runway": ["Standard", "Pro", "Unlimited"],
};

const EMPTY_FORM = { toolName: "", plan: "", monthlySpend: "", seats: "" };



const Home = () => {
    const [auditResult, setAuditResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [shareUrl, setShareUrl] = useState("");
    const [email, setEmail] = useState("");
    const [submittedData, setSubmittedData] = useState(null);
    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem("auditForm");
        return saved ? JSON.parse(saved) : EMPTY_FORM;
    });

    const availablePlans = formData.toolName
        ? TOOLS_CONFIG[formData.toolName] ?? []
        : [];

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updated = { ...formData, [name]: value };

        // Reset plan when tool changes
        if (name === "toolName") updated.plan = "";

        setFormData(updated);
        localStorage.setItem("auditForm", JSON.stringify(updated));
    };

    const handleSubmit = async () => {
        if (!formData.toolName || !formData.plan || !formData.monthlySpend || !formData.seats) {
            alert("Please fill all fields");
            return;
        }
        setSubmittedData({ ...formData });
        setLoading(true);
        try {
            const res = await axios.post("https://credex-ai-audit-jocx.onrender.com/api/audit", {
                email,
                tools: [formData],
            });
            const summary = generateSummary(
                [formData],
                res.data.totalMonthlySavings,
                res.data.totalYearlySavings,
                res.data.recommendations
            );

            setAuditResult({ ...res.data, summary });
            // setAuditResult(res.data);
            setShareUrl(
                `https://credex-ai-audit-ten.vercel.app/audit/${res.data.shareId}`
            );
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };



    const hasRecs = auditResult?.recommendations?.some(r => r.type !== "optimized");

    const monthlySavings =
        auditResult?.totalMonthlySavings || 0;

    const inputCls = "w-full px-3.5 py-2.5 border border-[#E0DDDA] rounded-xl bg-[#FAFAF8] text-[#1A1A1A] text-sm placeholder-[#C0BDB8] outline-none focus:border-[#1A1A1A] focus:bg-white transition-all";
    const labelCls = "text-[11px] font-medium text-[#888] uppercase tracking-widest block mb-1.5";

    return (
        <div className="min-h-screen bg-[#F7F6F2] flex flex-col items-center px-6 py-12">

            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-semibold text-[#1A1A1A] tracking-tight mb-1">
                    AI Spend Audit
                </h1>
                <p className="text-sm text-[#888]">
                    Find savings on your AI tool subscriptions
                </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E6DF] p-8 w-full max-w-md">

                {/* ── Audit Result ── */}
                {auditResult && (
                    <>
                        <p className="text-[11px] font-medium text-[#888] uppercase tracking-widest mb-4">
                            Audit Result
                        </p>

                        {/* Savings Cards */}
                        <div className="grid grid-cols-2 gap-3 mb-5">
                            <div className="bg-[#F2F0EA] rounded-xl px-4 py-3 text-center">
                                <p className="text-[11px] text-[#888] uppercase tracking-wide mb-1">Monthly Savings</p>
                                <p className="text-2xl font-semibold text-[#1A1A1A]">${auditResult.totalMonthlySavings}</p>
                            </div>
                            <div className="bg-[#F2F0EA] rounded-xl px-4 py-3 text-center">
                                <p className="text-[11px] text-[#888] uppercase tracking-wide mb-1">Yearly Savings</p>
                                <p className="text-2xl font-semibold text-[#1A1A1A]">${auditResult.totalYearlySavings}</p>
                            </div>
                        </div>

                        {/* Recommendation Cards */}
                        {hasRecs ? (
                            auditResult.recommendations.map((item, i) => (
                                <div key={i} className="border border-[#E8E6DF] rounded-xl p-4 mb-3">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-semibold text-[#1A1A1A]">{item.tool}</p>
                                        <span className="text-[11px] bg-[#F2F0EA] text-[#666] px-3 py-1 rounded-full">
                                            Recommended
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs bg-[#F7F6F2] border border-[#E0DDDA] text-[#555] px-2 py-0.5 rounded">
                                            {item.currentPlan}
                                        </span>
                                        <span className="text-[#C0BDB8]">→</span>
                                        <span className="text-xs bg-[#1A1A1A] text-white px-2 py-0.5 rounded">
                                            {item.recommendedPlan}
                                        </span>
                                    </div>
                                    <p className="text-sm text-[#666] leading-relaxed mb-2">{item.reason}</p>
                                    <div className="flex gap-4 pt-2 border-t border-[#F0EDE7]">
                                        <p className="text-xs text-[#888]">Monthly <span className="font-semibold text-[#1A1A1A]">${item.monthlySavings}</span></p>
                                        <p className="text-xs text-[#888]">Yearly <span className="font-semibold text-[#1A1A1A]">${item.yearlySavings}</span></p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 px-4">
                                <div className="text-3xl mb-3">✓</div>
                                <h3 className="font-semibold text-[#1A1A1A] mb-2">You're already optimized</h3>
                                <p className="text-sm text-[#888] leading-relaxed">
                                    Your current setup appears to be the best fit. No cost-saving recommendations at this time.
                                </p>
                            </div>
                        )}
                        {
                            monthlySavings > 500 && (
                                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-4 text-sm">
                                    Your organization may be significantly overspending on AI subscriptions.
                                </div>
                            )
                        }

                        {
                            monthlySavings > 0 &&
                            monthlySavings <= 100 && (
                                <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-4 text-sm">
                                    Your current AI spending appears relatively optimized.
                                </div>
                            )
                        }

                        {/* AI Summary — uses submittedData, not live formData */}
                        <div className="bg-[#F7F6F2] border border-[#E8E6DF] rounded-2xl p-5 mt-2">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 rounded-full bg-[#1A1A1A]" />
                                <span className="text-[11px] font-semibold text-[#1A1A1A] uppercase tracking-wide">
                                    AI Summary
                                </span>
                            </div>
                            <p className="text-sm text-[#555] leading-relaxed">
                                {auditResult.summary}
                            </p>
                        </div>

                        {/* Share URL */}
                        {shareUrl && (
                            <>
                                <div className="h-px bg-[#EDEBE6] my-6" />
                                <div>
                                    <p className={labelCls}>Share Report</p>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={shareUrl}
                                            readOnly
                                            className="flex-1 px-3 py-2 border border-[#E0DDDA] rounded-xl bg-[#FAFAF8] text-sm text-[#888]"
                                        />
                                        <a
                                            href={shareUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="px-4 py-2 bg-[#1A1A1A] text-white rounded-xl text-sm flex items-center justify-center"
                                        >
                                            Open
                                        </a>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="h-px bg-[#EDEBE6] my-6" />
                    </>
                )}

                {/* ── Form ── */}

                {/* Tool Name */}
                <div className="mb-4">
                    <label className={labelCls}>Tool Name</label>
                    <select
                        name="toolName"
                        value={formData.toolName}
                        onChange={handleChange}
                        className={inputCls + " appearance-none cursor-pointer"}
                    >
                        <option value="">Select a tool</option>
                        {Object.keys(TOOLS_CONFIG).map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>

                {/* Current Plan — dynamic based on tool */}
                <div className="mb-4">
                    <label className={labelCls}>Current Plan</label>
                    <select
                        name="plan"
                        value={formData.plan}
                        onChange={handleChange}
                        disabled={!formData.toolName}
                        className={inputCls + " appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"}
                    >
                        <option value="">
                            {formData.toolName ? "Select a plan" : "Select a tool first"}
                        </option>
                        {availablePlans.map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>

                {/* Monthly Spend + Seats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                        <label className={labelCls}>Monthly Spend ($)</label>
                        <input
                            name="monthlySpend"
                            value={formData.monthlySpend}
                            onChange={handleChange}
                            type="number"
                            placeholder="120"
                            className={inputCls}
                        />
                    </div>
                    <div>
                        <label className={labelCls}>Seats</label>
                        <input
                            name="seats"
                            value={formData.seats}
                            onChange={handleChange}
                            type="number"
                            placeholder="2"
                            className={inputCls}
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="mb-6">
                    <label className={labelCls}>Email Report (Optional)</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className={inputCls}
                    />
                </div>

                {/* Submit */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-3 bg-[#1A1A1A] text-white text-sm font-medium rounded-xl hover:opacity-85 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading && (
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="3" />
                            <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                        </svg>
                    )}
                    {loading ? "Analyzing..." : "Run Audit"}
                </button>
            </div>
        </div>
    );
};

export default Home;