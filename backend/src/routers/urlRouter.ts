import { Router } from 'express';
import shortenRouter from './shorten';

const router = Router();

router.use(shortenRouter);

export { router as urlRouter };