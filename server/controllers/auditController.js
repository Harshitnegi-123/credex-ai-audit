import auditEngine from "../utils/auditEngine.js";
import Audit from "../models/audit.js";
import { v4 as uuidv4 } from "uuid";
import { sendAuditEmail } from "../utils/sendEmail.js";

export const runAudit = async (req, res) => {

    try {
        const result = auditEngine(req.body);

        const shareId = uuidv4();
        const shareUrl =
            `https://credex-ai-audit-ten.vercel.app/audit/${shareId}`;
        if (req.body.email) {

            sendAuditEmail(
                req.body.email,
                shareUrl
            ).catch(err => console.log(err));
        }


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