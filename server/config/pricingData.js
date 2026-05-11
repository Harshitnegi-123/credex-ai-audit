export const pricing = {

    chatgpt: {
        plus: { price: 20, minSeats: 1, maxSeats: 2 },
        team: { price: 30, minSeats: 3, maxSeats: 20 },
        enterprise: { price: 60, minSeats: 21, maxSeats: Infinity }
    },
    claude: {
        pro: { price: 20, minSeats: 1, maxSeats: 2 },
        team: { price: 30, minSeats: 3, maxSeats: 20 },
        enterprise: { price: 60, minSeats: 21, maxSeats: Infinity }
    },
    cursor: {
        pro: { price: 20, minSeats: 1, maxSeats: 5 },
        business: { price: 40, minSeats: 6, maxSeats: Infinity }
    },

    github_copilot: {
        individual: { price: 10, minSeats: 1, maxSeats: 1 },
        business: { price: 19, minSeats: 2, maxSeats: 50 },
        enterprise: { price: 39, minSeats: 51, maxSeats: Infinity }
    },

    midjourney: {
        basic: { price: 10, minSeats: 1, maxSeats: 1 },
        standard: { price: 30, minSeats: 1, maxSeats: 1 },
        pro: { price: 60, minSeats: 1, maxSeats: 1 },
        mega: { price: 120, minSeats: 1, maxSeats: 1 }
    },

    perplexity: {
        pro: { price: 20, minSeats: 1, maxSeats: 4 },
        business: { price: 40, minSeats: 5, maxSeats: Infinity }
    },

    notion_ai: {
        plus: { price: 10, minSeats: 1, maxSeats: 4 },
        business: { price: 15, minSeats: 5, maxSeats: Infinity }
    },

    grammarly: {
        premium: { price: 12, minSeats: 1, maxSeats: 2 },
        business: { price: 15, minSeats: 3, maxSeats: Infinity }
    },

    runway: {
        standard: { price: 15, minSeats: 1, maxSeats: 1 },
        pro: { price: 35, minSeats: 1, maxSeats: 1 },
        unlimited: { price: 95, minSeats: 1, maxSeats: 1 }
    },
    gemini: {
        free: { price: 0, minSeats: 1, maxSeats: 2 },
        pro: { price: 20, minSeats: 1, maxSeats: 5 },
        ultra: { price: 40, minSeats: 6, maxSeats: Infinity }
    },

    copilot: {
        free: { price: 0, minSeats: 1, maxSeats: 1 },
        individual: { price: 10, minSeats: 1, maxSeats: 5 },
        business: { price: 19, minSeats: 6, maxSeats: Infinity }
    }
};