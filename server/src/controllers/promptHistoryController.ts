import { Request, Response } from 'express';
import { PromptHistory } from '../models';

export const savePromptHistory = async (req: Request, res: Response) => {
    try {
        const { userId, category, subcategory, prompt, response } = req.body;
        
        const historyItem = new PromptHistory({
            userId,
            category,
            subcategory,
            prompt,
            response
        });
        
        await historyItem.save();
        res.status(201).json({ message: 'History saved successfully' });
    } catch (error) {
        console.error('Error saving history:', error);
        res.status(500).json({ error: 'Failed to save history' });
    }
};

export const getUserHistory = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        
        const history = await PromptHistory.find({ userId })
            .sort({ timestamp: -1 })
            .limit(100);
            
        res.json(history);
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
};

export const clearUserHistory = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        
        await PromptHistory.deleteMany({ userId });
        res.json({ message: 'History cleared successfully' });
    } catch (error) {
        console.error('Error clearing history:', error);
        res.status(500).json({ error: 'Failed to clear history' });
    }
};