import { Router } from 'express';
import { ingestData } from '../controllers/loggerController.js';

const router = Router();
router.post('/log', ingestData);
export default router;