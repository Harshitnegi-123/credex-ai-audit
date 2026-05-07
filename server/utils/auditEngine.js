const auditEngine = (data) => {
    const recommendations = [];

    let totalMonthlySavings = 0;
    let totalYearlySavings = 0;

    const pricing = {
        ChatGPT: {
            Team: 30,
            Plus: 20
        }
    };

    data.tools.forEach((tool) => {

        const seats = Number(tool.seats);

        const toolName =
            tool.toolName.toLowerCase();

        const plan =
            tool.plan.toLowerCase();

        if (
            tool.toolName === "chatgpt" &&
            tool.plan === "team" &&
            seats <= 2
        ) {

            const currentCost =
                pricing.ChatGPT.Team * seats;

            const recommendedCost =
                pricing.ChatGPT.Plus * seats;

            const monthlySavings = currentCost - recommendedCost;

            const yearlySavings = monthlySavings * 12;

            totalMonthlySavings += monthlySavings;
            totalYearlySavings += yearlySavings;


            recommendations.push({
                tool: "ChatGPT",
                currentPlan: "Team",
                recommendedPlan: "Plus",
                monthlySavings,
                yearlySavings,
                reason: "Small teams can save money using Plus instead of Team plan"
            });
        }

    });
    return {
        totalMonthlySavings,
        totalYearlySavings,
        recommendations
    };
};

export default auditEngine;