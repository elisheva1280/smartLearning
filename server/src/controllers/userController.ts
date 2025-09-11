import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        console.log('Returning users:', users);
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

export const register = async (req: Request, res: Response) => {
    try {
        const { name, phone, password } = req.body;
        
        const existingUser = await User.findOne({ name, phone });
        if (existingUser) {
            return res.status(400).json({ error: 'משתמש עם שם וטלפון זה כבר קיים' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, username: name, phone, password: hashedPassword });
        await user.save();
        
        const token = jwt.sign(
            { id: user._id, name: user.name, phone: user.phone, isAdmin: user.isAdmin },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '24h' }
        );
        
        res.status(201).json({ 
            token, 
            user: { id: user._id, name: user.name, phone: user.phone, isAdmin: user.isAdmin } 
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'שגיאה ברישום משתמש' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { name, phone, password } = req.body;
        
        const user = await User.findOne({ name, phone });
        
        if (!user) {
            return res.status(400).json({ error: 'שם משתמש, טלפון או סיסמה שגויים' });
        }
        
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'שם משתמש, טלפון או סיסמה שגויים' });
        }
        
        const token = jwt.sign(
            { id: user._id, name: user.name, phone: user.phone, isAdmin: user.isAdmin },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '24h' }
        );
        
        res.json({ 
            token, 
            user: { id: user._id, name: user.name, phone: user.phone, isAdmin: user.isAdmin } 
        });
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בהתחברות' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, phone, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, phone, password: hashedPassword });
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

export const createAdmin = async (req: Request, res: Response) => {
    try {
        const { name, phone, password } = req.body;
        
        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            existingUser.password = hashedPassword;
            existingUser.isAdmin = true;
            await existingUser.save();
            res.json({ message: 'משתמש עודכן למנהל', user: existingUser });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const admin = new User({ name, phone, password: hashedPassword, isAdmin: true });
            await admin.save();
            res.status(201).json({ message: 'מנהל נוצר בהצלחה', user: admin });
        }
    } catch (error) {
        res.status(500).json({ error: 'שגיאה ביצירת מנהל' });
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