import { Router } from 'express';
import shortenRouter from './shorten';
import redirectRouter from './redirect';

const router = Router();

router.use(shortenRouter);
router.use(redirectRouter);

export { router as urlRouter };