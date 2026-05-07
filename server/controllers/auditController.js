import auditEngine from "../utils/auditEngine.js";

export const runAudit = (req, res) => {
    try {
        const data = req.body;

        const result = auditEngine(data);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};