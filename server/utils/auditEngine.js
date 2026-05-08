const auditEngine = (data) => {
    const recommendations = [];

    let totalMonthlySavings = 0;
    let totalYearlySavings = 0;

    const pricing = {
        chatgpt: {
            team: 30,
            plus: 20
        },
        claude: {
            pro: 20,
            team: 30
        },

        cursor: {
            pro: 20,
            business: 40
        }
    };

    const rules = {
        chatgpt: {
            from: "team",
            to: "plus",
            maxSeats: 2
        },
        claude: {
            from: "team",
            to: "pro",
            maxSeats: 3
        },
        cursor: {
            from: "business",
            to: "pro",
            maxSeats: 2
        }
    };

    data.tools.forEach((tool) => {

        const seats = Number(tool.seats);
        const toolName = tool.toolName.toLowerCase();
        const plan = tool.plan.toLowerCase();
        const rule = rules[toolName];

        if (
            pricing[toolName][rule.to] &&
            pricing[toolName][plan] &&
            rule &&
            plan === rule.from &&
            seats <= rule.maxSeats
        ) {

            const currentCost = Number(tool.monthlySpend);

            const recommendedCost =
                pricing[toolName][rule.to] * seats;

            const monthlySavings =
                currentCost - recommendedCost;

            const yearlySavings =
                monthlySavings * 12;

            if (monthlySavings > 0) {

                totalMonthlySavings += monthlySavings;
                totalYearlySavings += yearlySavings;

                recommendations.push({
                    tool: tool.toolName,
                    currentPlan: tool.plan,
                    recommendedPlan: rule.to,
                    monthlySavings,
                    yearlySavings,
                    reason:
                        `Small teams can save money by switching from ${tool.plan} to ${rule.to}`
                });
            }
        }

    });
    return {
        totalMonthlySavings,
        totalYearlySavings,
        recommendations
    };
};

export default auditEngine;