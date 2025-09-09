import { Request, Response } from 'express';
import { Category } from '../models';

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בקבלת קטגוריות' });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ error: 'קטגוריה לא נמצאה' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בקבלת קטגוריה' });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const category = new Category({ name });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'שגיאה ביצירת קטגוריה' });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).json({ error: 'קטגוריה לא נמצאה' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בעדכון קטגוריה' });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ error: 'קטגוריה לא נמצאה' });
        res.json({ message: 'קטגוריה נמחקה בהצלחה' });
    } catch (error) {
        res.status(500).json({ error: 'שגיאה במחיקת קטגוריה' });
    }
};