import { Router } from 'express';
import { getAllSubCategories, getSubCategoryById, getSubCategoriesByCategory, createSubCategory, updateSubCategory, deleteSubCategory } from '../controllers/subCategoryController';

const router = Router();

router.get('/', getAllSubCategories);
router.get('/:id', getSubCategoryById);
router.get('/category/:categoryId', getSubCategoriesByCategory);
router.post('/', createSubCategory);
router.put('/:id', updateSubCategory);
router.delete('/:id', deleteSubCategory);

export default router;