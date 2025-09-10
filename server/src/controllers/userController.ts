import { Request, Response } from 'express';
import { User } from '../models';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בקבלת משתמשים' });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'משתמש לא נמצא' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בקבלת משתמש' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, phone } = req.body;
        const user = new User({ name, phone });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'שגיאה ביצירת משתמש' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ error: 'משתמש לא נמצא' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בעדכון משתמש' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'משתמש לא נמצא' });
        res.json({ message: 'משתמש נמחק בהצלחה' });
    } catch (error) {
        res.status(500).json({ error: 'שגיאה במחיקת משתמש' });
    }
};

export const checkUser = async (req: Request, res: Response) => {
    try {
        const { name, phone } = req.body;
        const user = await User.findOne({ name, phone });
        
        if (user) {
            res.json({ 
                exists: true, 
                isAdmin: user.isAdmin || false,
                user: {
                    id: user._id,
                    name: user.name,
                    phone: user.phone
                }
            });
        } else {
            res.json({ 
                exists: false,
                isAdmin: false
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בבדיקת משתמש' });
    }
};