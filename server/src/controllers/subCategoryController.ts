import { Request, Response } from 'express';
import { SubCategory, Category } from '../models';

export const getAllSubCategories = async (req: Request, res: Response) => {
    try {
        const subCategories = await SubCategory.find().populate('category_id');
        res.json(subCategories);
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בקבלת תת-קטגוריות' });
    }
};

export const getSubCategoryById = async (req: Request, res: Response) => {
    try {
        const subCategory = await SubCategory.findById(req.params.id).populate('category_id');
        if (!subCategory) return res.status(404).json({ error: 'תת-קטגוריה לא נמצאה' });
        res.json(subCategory);
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בקבלת תת-קטגוריה' });
    }
};

export const getSubCategoriesByCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.findOne({ name: req.params.categoryId });
        if (!category) return res.status(404).json({ error: 'קטגוריה לא נמצאה' });
        const subCategories = await SubCategory.find({ category_id: category._id });
        res.json(subCategories);
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בקבלת תת-קטגוריות לפי קטגוריה' });
    }
};

export const createSubCategory = async (req: Request, res: Response) => {
    try {
        const { name, category_id } = req.body;
        const subCategory = new SubCategory({ name, category_id });
        await subCategory.save();
        res.status(201).json(subCategory);
    } catch (error) {
        res.status(500).json({ error: 'שגיאה ביצירת תת-קטגוריה' });
    }
};

export const updateSubCategory = async (req: Request, res: Response) => {
    try {
        const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!subCategory) return res.status(404).json({ error: 'תת-קטגוריה לא נמצאה' });
        res.json(subCategory);
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בעדכון תת-קטגוריה' });
    }
};

export const deleteSubCategory = async (req: Request, res: Response) => {
    try {
        const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
        if (!subCategory) return res.status(404).json({ error: 'תת-קטגוריה לא נמצאה' });
        res.json({ message: 'תת-קטגוריה נמחקה בהצלחה' });
    } catch (error) {
        res.status(500).json({ error: 'שגיאה במחיקת תת-קטגוריה' });
    }
};