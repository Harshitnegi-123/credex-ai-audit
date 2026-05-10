import express from 'express';
import { runAudit } from '../controllers/auditController.js';

const router = express.Router();

router.post('/audit', runAudit);
router.get("/:shareId", getSharedAudit);

export default router;