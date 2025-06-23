import { Router } from 'express';
import { deleteController } from '../controllers/delete';

const router = Router();

router.delete('/delete/:shortUrl', deleteController);

export default router;