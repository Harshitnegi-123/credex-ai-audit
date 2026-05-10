import mongoose from "mongoose";

const auditSchema = new mongoose.Schema({

    tools: [
        {
            toolName: String,
            plan: String,
            seats: Number,
            monthlySpend: Number
        }
    ],

    recommendations: [
        new mongoose.Schema({

            type: {
                type: String
            },

            tool: String,

            currentPlan: String,

            recommendedPlan: String,

            monthlySavings: Number,

            yearlySavings: Number,

            reason: String

        }, { _id: false })
    ],

    totalMonthlySavings: Number,

    totalYearlySavings: Number,

    shareId: {
        type: String,
        unique: true
    }

}, { timestamps: true });

const Audit =
    mongoose.models.Audit ||
    mongoose.model("Audit", auditSchema);

export default Audit;