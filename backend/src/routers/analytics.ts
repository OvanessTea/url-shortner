import { Router } from 'express';
import { analyticsController } from '../controllers/analytics';

const router = Router();

router.get('/analytics/:shortUrl', analyticsController);

export default router;