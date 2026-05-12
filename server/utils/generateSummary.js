export const generateSummary = (tools, totalMonthlySavings, totalYearlySavings, recommendations) => {


    if (!tools || !Array.isArray(tools)) return "Audit complete.";

    const toolNames = tools.map(t => t.toolName).join(", ");
    const hasRecs = recommendations.length > 0;
    const bigSavings = totalMonthlySavings > 500;

    if (bigSavings) {
        return `Your team is currently spending on ${toolNames}. Our audit found $${totalMonthlySavings}/month in potential savings — that's $${totalYearlySavings}/year. The biggest opportunity is switching plans on underutilized tools. Companies your size typically overspend by 40% on AI subscriptions. Acting on these recommendations could free up significant budget for higher-impact investments.`;
    }

    if (hasRecs && !bigSavings) {
        return `Based on your ${toolNames} usage, we identified $${totalMonthlySavings}/month in savings. Your team has a few plans that don't match your actual usage patterns. Small adjustments — like downgrading underused seats or switching tiers — can add up to $${totalYearlySavings} annually without impacting productivity.`;
    }

    if (!hasRecs) {
        return `Good news — your current ${toolNames} setup looks well-optimized for your team size and use case. You're on the right plans with no obvious overspend detected. We'll notify you if better options become available or if your usage patterns change. Keep reviewing quarterly as AI tool pricing evolves rapidly.`;
    }
};