import { Router } from 'express';
import shortenRouter from './shorten';
import redirectRouter from './redirect';
import infoRouter from './info';

const router = Router();

router.use(shortenRouter);
router.use(redirectRouter);
router.use(infoRouter);

export { router as urlRouter };