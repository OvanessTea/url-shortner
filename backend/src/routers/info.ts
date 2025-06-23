import { Router } from 'express';
import { infoController } from '../controllers/info';

const router = Router();

router.get('/info/:shortUrl', infoController);

export default router;