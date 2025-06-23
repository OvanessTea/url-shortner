import { Router } from 'express';
import { shortenController } from '../controllers/shorten';

const router = Router();

router.post('/shorten', shortenController);

export default router;