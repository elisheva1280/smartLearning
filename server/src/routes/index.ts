import { Router } from 'express';
import userRoutes from './userRoutes';
import categoryRoutes from './categoryRoutes';
import subCategoryRoutes from './subCategoryRoutes';
import promptRoutes from './promptRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/subcategories', subCategoryRoutes);
router.use('/prompts', promptRoutes);

export default router;