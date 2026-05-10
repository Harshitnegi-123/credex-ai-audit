export const createRecommendation = ({
    type,
    tool,
    currentPlan,
    recommendedPlan,
    monthlySavings,
    yearlySavings,
    reason
}) => {

    return {
        type,
        tool,
        currentPlan,
        recommendedPlan,
        monthlySavings,
        yearlySavings,
        reason
    };
};