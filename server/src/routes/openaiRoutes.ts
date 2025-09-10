import { Router } from 'express';
import { generateResponse } from '../controllers/openaiController';

const router = Router();

router.post('/', generateResponse);

export default router;