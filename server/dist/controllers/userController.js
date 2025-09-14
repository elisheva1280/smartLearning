"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = exports.createAdmin = exports.deleteUser = exports.updateUser = exports.createUser = exports.login = exports.register = exports.getUserById = exports.getAllUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.User.find();
        console.log('Returning users:', users);
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה בקבלת משתמשים' });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findById(req.params.id);
        if (!user)
            return res.status(404).json({ error: 'משתמש לא נמצא' });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה בקבלת משתמש' });
    }
});
exports.getUserById = getUserById;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone, password } = req.body;
        // בדיקת חוזק סיסמה
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,16}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                error: 'הסיסמה חייבת להכיל 8-16 תווים, אות גדולה, אות קטנה, מספר ותו מיוחד'
            });
        }
        const existingUser = yield models_1.User.findOne({ name, phone });
        if (existingUser) {
            return res.status(400).json({ error: 'משתמש עם שם וטלפון זה כבר קיים' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new models_1.User({ name, username: name, phone, password: hashedPassword });
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ id: user._id, name: user.name, phone: user.phone, isAdmin: user.isAdmin }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '24h' });
        res.status(201).json({
            token,
            user: { id: user._id, name: user.name, phone: user.phone, isAdmin: user.isAdmin }
        });
    }
    catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'שגיאה ברישום משתמש' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone, password } = req.body;
        const user = yield models_1.User.findOne({ name, phone });
        if (!user) {
            return res.status(400).json({ error: 'שם משתמש, טלפון או סיסמה שגויים' });
        }
        const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'שם משתמש, טלפון או סיסמה שגויים' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, name: user.name, phone: user.phone, isAdmin: user.isAdmin }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '24h' });
        res.json({
            token,
            user: { id: user._id, name: user.name, phone: user.phone, isAdmin: user.isAdmin }
        });
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה בהתחברות' });
    }
});
exports.login = login;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone, password } = req.body;
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new models_1.User({ name, phone, password: hashedPassword });
        yield user.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה ביצירת משתמש' });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user)
            return res.status(404).json({ error: 'משתמש לא נמצא' });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה בעדכון משתמש' });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).json({ error: 'משתמש לא נמצא' });
        res.json({ message: 'משתמש נמחק בהצלחה' });
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה במחיקת משתמש' });
    }
});
exports.deleteUser = deleteUser;
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone, password } = req.body;
        const existingUser = yield models_1.User.findOne({ phone });
        if (existingUser) {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            existingUser.password = hashedPassword;
            existingUser.isAdmin = true;
            yield existingUser.save();
            res.json({ message: 'משתמש עודכן למנהל', user: existingUser });
        }
        else {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const admin = new models_1.User({ name, phone, password: hashedPassword, isAdmin: true });
            yield admin.save();
            res.status(201).json({ message: 'מנהל נוצר בהצלחה', user: admin });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה ביצירת מנהל' });
    }
});
exports.createAdmin = createAdmin;
const checkUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone } = req.body;
        const user = yield models_1.User.findOne({ name, phone });
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
        }
        else {
            res.json({
                exists: false,
                isAdmin: false
            });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה בבדיקת משתמש' });
    }
});
exports.checkUser = checkUser;
