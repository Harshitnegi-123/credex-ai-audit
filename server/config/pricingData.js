export const pricing = {
    chatgpt: {
        plus: {
            price: 20,
            minSeats: 1,
            maxSeats: 2
        },

        team: {
            price: 30,
            minSeats: 3,
            maxSeats: 20
        },

        enterprise: {
            price: 60,
            minSeats: 21,
            maxSeats: Infinity
        }
    },

    claude: {
        pro: {
            price: 20,
            minSeats: 1,
            maxSeats: 2
        },

        team: {
            price: 30,
            minSeats: 3,
            maxSeats: 20
        }
    },

    cursor: {
        pro: {
            price: 20,
            minSeats: 1,
            maxSeats: 5
        },

        business: {
            price: 40,
            minSeats: 6,
            maxSeats: Infinity
        }
    }
};