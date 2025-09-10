import { Request, Response } from 'express';
import { Prompt } from '../models';

export const getAllPrompts = async (req: Request, res: Response) => {
    try {
        const prompts = await Prompt.find()
            .populate('user_id')
            .populate('category_id')
            .populate('sub_category_id');
        res.json(prompts);
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בקבלת פרומפטים' });
    }
};

export const getPromptById = async (req: Request, res: Response) => {
    try {
        const prompt = await Prompt.findById(req.params.id)
            .populate('user_id')
            .populate('category_id')
            .populate('sub_category_id');
        if (!prompt) return res.status(404).json({ error: 'פרומפט לא נמצא' });
        res.json(prompt);
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בקבלת פרומפט' });
    }
};

export const getPromptsByUser = async (req: Request, res: Response) => {
    try {
        const prompts = await Prompt.find({ user_id: req.params.userId })
            .populate('category_id')
            .populate('sub_category_id');
        res.json(prompts);
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בקבלת פרומפטים לפי משתמש' });
    }
};

export const getPromptsByCategory = async (req: Request, res: Response) => {
    try {
        const prompts = await Prompt.find({ category_id: req.params.categoryId })
            .populate('user_id')
            .populate('sub_category_id');
        res.json(prompts);
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בקבלת פרומפטים לפי קטגוריה' });
    }
};

export const createPrompt = async (req: Request, res: Response) => {
    try {
        console.log('*** קוד חדש - קבלתי בקשה ליצירת פרומפט ***:', req.body);
        const { user_id, category_id, sub_category_id, category, subcategory, prompt, response } = req.body;
        console.log('*** שדות חדשים - category:', category, 'subcategory:', subcategory);
        const newPrompt = new Prompt({ user_id, category_id, sub_category_id, category, subcategory, prompt, response });
        console.log('יוצר פרומפט חדש:', newPrompt);
        await newPrompt.save();
        console.log('פרומפט נשמר בהצלחה!');
        res.status(201).json(newPrompt);
    } catch (error) {
        console.error('שגיאה ביצירת פרומפט:', error);
        res.status(500).json({ error: 'שגיאה ביצירת פרומפט' });
    }
};

export const updatePrompt = async (req: Request, res: Response) => {
    try {
        const prompt = await Prompt.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!prompt) return res.status(404).json({ error: 'פרומפט לא נמצא' });
        res.json(prompt);
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בעדכון פרומפט' });
    }
};

export const deletePrompt = async (req: Request, res: Response) => {
    try {
        const prompt = await Prompt.findByIdAndDelete(req.params.id);
        if (!prompt) return res.status(404).json({ error: 'פרומפט לא נמצא' });
        res.json({ message: 'פרומפט נמחק בהצלחה' });
    } catch (error) {
        res.status(500).json({ error: 'שגיאה במחיקת פרומפט' });
    }
};