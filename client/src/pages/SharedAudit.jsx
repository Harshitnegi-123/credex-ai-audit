import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SharedAudit = () => {
    const { shareId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/audit/${shareId}`)
            .then(res => setData(res.data))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [shareId]);

    if (loading) return (
        <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
            <p className="text-sm text-[#888]">Loading report...</p>
        </div>
    );

    if (error || !data) return (
        <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
            <p className="text-sm text-[#888]">Report not found.</p>
        </div>
    );

    const hasRecs = data.recommendations?.some(r => r.type !== "optimized");

    return (
        <div className="min-h-screen bg-[#F7F6F2] flex flex-col items-center px-6 py-12">

            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-semibold text-[#1A1A1A] tracking-tight mb-1">
                    AI Spend Audit
                </h1>
                <p className="text-sm text-[#888]">Shared report</p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E6DF] p-8 w-full max-w-md">

                <p className="text-[11px] font-medium text-[#888] uppercase tracking-widest mb-4">
                    Audit Result
                </p>

                {/* Savings Cards */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-[#F2F0EA] rounded-xl px-4 py-3 text-center">
                        <p className="text-[11px] text-[#888] uppercase tracking-wide mb-1">Monthly Savings</p>
                        <p className="text-2xl font-semibold text-[#1A1A1A]">${data.totalMonthlySavings}</p>
                    </div>
                    <div className="bg-[#F2F0EA] rounded-xl px-4 py-3 text-center">
                        <p className="text-[11px] text-[#888] uppercase tracking-wide mb-1">Yearly Savings</p>
                        <p className="text-2xl font-semibold text-[#1A1A1A]">${data.totalYearlySavings}</p>
                    </div>
                </div>

                {/* Recommendation Cards */}
                {hasRecs ? (
                    data.recommendations.map((item, i) => (
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
                        <h3 className="font-semibold text-[#1A1A1A] mb-2">Already Optimized</h3>
                        <p className="text-sm text-[#888] leading-relaxed">
                            This setup appears to be the best fit. No cost-saving recommendations at this time.
                        </p>
                    </div>
                )}

                {/* AI Summary */}
                <div className="bg-[#F7F6F2] border border-[#E8E6DF] rounded-2xl p-5 mt-2">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-[#1A1A1A]" />
                        <span className="text-[11px] font-semibold text-[#1A1A1A] uppercase tracking-wide">
                            AI Summary
                        </span>
                    </div>
                    <p className="text-sm text-[#555] leading-relaxed">
                        {hasRecs
                            ? `Based on the audit, switching to a lighter tier could save $${data.totalYearlySavings}/year. Unused seats are the most common source of AI overspend.`
                            : `The current setup looks well-optimized. No changes recommended right now.`
                        }
                    </p>
                </div>

                {/* Run Your Own Audit CTA */}
                <div className="h-px bg-[#EDEBE6] my-6" />
                <a
                    href="/"
                    className="w-full py-3 bg-[#1A1A1A] text-white text-sm font-medium rounded-xl hover:opacity-85 transition-all flex items-center justify-center"
                >
                    Run Your Own Audit
                </a>
            </div>
        </div>
    );
};

export default SharedAudit;