import { Router } from 'express';
import { redirectController } from '../controllers/redirect';

const router = Router();

router.get('/:shortUrl', redirectController);

export default router;