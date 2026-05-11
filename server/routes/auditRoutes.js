import express from 'express';
import { runAudit } from '../controllers/auditController.js';
import { getSharedAudit } from '../controllers/auditController.js';

const router = express.Router();

router.post('/audit', runAudit);
router.get("/audit/:shareId", getSharedAudit);

export default router;