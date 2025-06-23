import { Router } from 'express';
import shortenRouter from './shorten';
import redirectRouter from './redirect';
import infoRouter from './info';
import deleteRouter from './delete';

const router = Router();

router.use(shortenRouter);
router.use(redirectRouter);
router.use(infoRouter);
router.use(deleteRouter);

export { router as urlRouter };