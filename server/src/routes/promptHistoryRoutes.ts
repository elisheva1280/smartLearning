import { Router } from 'express';
import { savePromptHistory, getUserHistory, clearUserHistory } from '../controllers/promptHistoryController';

const router = Router();

router.post('/', savePromptHistory);
router.get('/:userId', getUserHistory);
router.delete('/:userId', clearUserHistory);

export default router;