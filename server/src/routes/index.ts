import { Router } from 'express';
import userRoutes from './userRoutes';
import categoryRoutes from './categoryRoutes';
import subCategoryRoutes from './subCategoryRoutes';
import promptRoutes from './promptRoutes';
import promptHistoryRoutes from './promptHistoryRoutes';
import openaiRoutes from './openaiRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/subcategories', subCategoryRoutes);
router.use('/prompts', promptRoutes);
router.use('/prompt-history', promptHistoryRoutes);
router.use('/openai', openaiRoutes);

export default router;