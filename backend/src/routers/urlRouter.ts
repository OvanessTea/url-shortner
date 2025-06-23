import { Router } from 'express';
import shortenRouter from './shorten';
import redirectRouter from './redirect';
import infoRouter from './info';
import deleteRouter from './delete';
import analyticsRouter from './analytics';

const router = Router();

router.use(shortenRouter);
router.use(redirectRouter);
router.use(infoRouter);
router.use(deleteRouter);
router.use(analyticsRouter);

export { router as urlRouter };