import { pricing } from "../config/pricingData.js";
import { createRecommendation } from "./createRecommendation.js";
import { RECOMMENDATION_TYPES } from "../constants/recommendationTypes.js";

const formatPlan = (plan) => {
    return plan.charAt(0).toUpperCase() + plan.slice(1);
};

const auditEngine = (data) => {
    const recommendations = [];

    let totalMonthlySavings = 0;
    let totalYearlySavings = 0;

    const downgradeRules = {

        chatgpt: { from: "team", to: "plus", maxSeats: 2 },
        claude: { from: "team", to: "pro", maxSeats: 3 },
        cursor: { from: "business", to: "pro", maxSeats: 2 },
        github_copilot: { from: "enterprise", to: "business", maxSeats: 10 },
        perplexity: { from: "business", to: "pro", maxSeats: 3 },
        notion_ai: { from: "business", to: "plus", maxSeats: 3 },
        grammarly: { from: "business", to: "premium", maxSeats: 2 },
        midjourney: { from: "pro", to: "standard", maxSeats: 1 },
        runway: { from: "pro", to: "standard", maxSeats: 1 }
    };

    const upgradeRules = {

        chatgpt: { from: "plus", to: "team", minSeats: 5 },
        claude: { from: "pro", to: "team", minSeats: 5 },
        cursor: { from: "pro", to: "business", minSeats: 6 },
        github_copilot: { from: "business", to: "enterprise", minSeats: 51 },
        perplexity: { from: "pro", to: "business", minSeats: 5 },
        notion_ai: { from: "plus", to: "business", minSeats: 5 },
        grammarly: { from: "premium", to: "business", minSeats: 3 },
        midjourney: { from: "standard", to: "pro", minSeats: 1 },
        runway: { from: "standard", to: "pro", minSeats: 1 }
    };

    data.tools.forEach((tool) => {

        let recommendationMade = false;
        const seats = Number(tool.seats);
        const toolName = tool.toolName.toLowerCase().replace(/\s+/g, "_");
        const plan = tool.plan.toLowerCase();
        const downgradeRule = downgradeRules[toolName];

        if (
            downgradeRule &&
            pricing[toolName] &&
            pricing[toolName][downgradeRule.to] &&
            pricing[toolName][plan] &&
            plan === downgradeRule.from &&
            seats <= downgradeRule.maxSeats
        ) {

            const currentCost =
                pricing[toolName][plan].price * seats;

            const recommendedCost =
                pricing[toolName][downgradeRule.to].price * seats;

            const monthlySavings =
                currentCost - recommendedCost;

            const yearlySavings =
                monthlySavings * 12;

            if (monthlySavings > 0) {

                totalMonthlySavings += monthlySavings;
                totalYearlySavings += yearlySavings;

                recommendations.push(createRecommendation({
                    type: RECOMMENDATION_TYPES.DOWNGRADE,
                    tool: tool.toolName,
                    currentPlan: tool.plan,
                    recommendedPlan: formatPlan(downgradeRule.to),
                    monthlySavings,
                    yearlySavings,
                    reason:
                        `Teams with fewer than ${downgradeRule.maxSeats + 1} users typically don't benefit from premium collaboration features.`
                }));
                recommendationMade = true;
                return;
            }
        }

        const upgradeRule = upgradeRules[toolName];

        if (
            upgradeRule &&
            pricing[toolName] &&
            pricing[toolName][upgradeRule.to] &&
            pricing[toolName][plan] &&
            plan === upgradeRule.from &&
            seats >= upgradeRule.minSeats
        ) {

            recommendations.push(
                createRecommendation({
                    type: RECOMMENDATION_TYPES.UPGRADE,

                    tool: tool.toolName,

                    currentPlan: tool.plan,

                    recommendedPlan: formatPlan(upgradeRule.to),

                    monthlySavings: 0,

                    yearlySavings: 0,

                    reason:
                        `Teams with ${upgradeRule.minSeats}+ users typically benefit from centralized billing, admin controls, and collaboration features included in ${upgradeRule.to}.`
                })
            );
            recommendationMade = true;
            return;
        }
        if (!recommendationMade) {

            recommendations.push(
                createRecommendation({
                    type: RECOMMENDATION_TYPES.OPTIMIZED,

                    tool: tool.toolName,

                    currentPlan: tool.plan,

                    recommendedPlan: tool.plan,

                    monthlySavings: 0,

                    yearlySavings: 0,

                    reason:
                        `Your current ${tool.plan} plan aligns well with a ${seats}-user team and does not show obvious overspending risks.`
                })
            );
        }
    }

    );
    return {
        totalMonthlySavings,
        totalYearlySavings,
        recommendations
    };
};

export default auditEngine;