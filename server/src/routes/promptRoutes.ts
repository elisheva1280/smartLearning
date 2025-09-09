import { Router } from 'express';
import { getAllPrompts, getPromptById, getPromptsByUser, getPromptsByCategory, createPrompt, updatePrompt, deletePrompt } from '../controllers/promptController';

const router = Router();

router.get('/', getAllPrompts);
router.get('/:id', getPromptById);
router.get('/user/:userId', getPromptsByUser);
router.get('/category/:categoryId', getPromptsByCategory);
router.post('/', createPrompt);
router.put('/:id', updatePrompt);
router.delete('/:id', deletePrompt);

export default router;