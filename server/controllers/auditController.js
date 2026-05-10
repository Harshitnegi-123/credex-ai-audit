import auditEngine from "../utils/auditEngine.js";
import Audit from "../models/audit.js";
import { v4 as uuidv4 } from "uuid";

export const runAudit = async (req, res) => {

    try {
        console.log(req.body)
        const result = auditEngine(req.body);
        console.log(result.recommendations);
        console.log(typeof result.recommendations[0]);
        console.log(result.recommendations[0]);

        const shareId = uuidv4();

        const savedAudit = await Audit.create({

            tools: req.body.tools,

            recommendations: result.recommendations,

            totalMonthlySavings:
                result.totalMonthlySavings,

            totalYearlySavings:
                result.totalYearlySavings,

            shareId
        });

        res.status(200).json(savedAudit);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
};

export const getSharedAudit = async (req, res) => {

    try {

        const audit = await Audit.findOne({
            shareId: req.params.shareId
        });

        if (!audit) {
            return res.status(404).json({
                message: "Audit not found"
            });
        }

        res.status(200).json(audit);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};