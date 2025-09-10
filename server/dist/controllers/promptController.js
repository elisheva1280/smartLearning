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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePrompt = exports.updatePrompt = exports.createPrompt = exports.getPromptsByCategory = exports.getPromptsByUser = exports.getPromptById = exports.getAllPrompts = void 0;
const models_1 = require("../models");
const getAllPrompts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prompts = yield models_1.Prompt.find()
            .populate('user_id')
            .populate('category_id')
            .populate('sub_category_id');
        res.json(prompts);
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה בקבלת פרומפטים' });
    }
});
exports.getAllPrompts = getAllPrompts;
const getPromptById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prompt = yield models_1.Prompt.findById(req.params.id)
            .populate('user_id')
            .populate('category_id')
            .populate('sub_category_id');
        if (!prompt)
            return res.status(404).json({ error: 'פרומפט לא נמצא' });
        res.json(prompt);
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה בקבלת פרומפט' });
    }
});
exports.getPromptById = getPromptById;
const getPromptsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prompts = yield models_1.Prompt.find({ user_id: req.params.userId })
            .populate('category_id')
            .populate('sub_category_id');
        res.json(prompts);
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה בקבלת פרומפטים לפי משתמש' });
    }
});
exports.getPromptsByUser = getPromptsByUser;
const getPromptsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prompts = yield models_1.Prompt.find({ category_id: req.params.categoryId })
            .populate('user_id')
            .populate('sub_category_id');
        res.json(prompts);
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה בקבלת פרומפטים לפי קטגוריה' });
    }
});
exports.getPromptsByCategory = getPromptsByCategory;
const createPrompt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('*** קוד חדש - קבלתי בקשה ליצירת פרומפט ***:', req.body);
        const { user_id, category_id, sub_category_id, category, subcategory, prompt, response } = req.body;
        console.log('*** שדות חדשים - category:', category, 'subcategory:', subcategory);
        const newPrompt = new models_1.Prompt({ user_id, category_id, sub_category_id, category, subcategory, prompt, response });
        console.log('יוצר פרומפט חדש:', newPrompt);
        yield newPrompt.save();
        console.log('פרומפט נשמר בהצלחה!');
        res.status(201).json(newPrompt);
    }
    catch (error) {
        console.error('שגיאה ביצירת פרומפט:', error);
        res.status(500).json({ error: 'שגיאה ביצירת פרומפט' });
    }
});
exports.createPrompt = createPrompt;
const updatePrompt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prompt = yield models_1.Prompt.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!prompt)
            return res.status(404).json({ error: 'פרומפט לא נמצא' });
        res.json(prompt);
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה בעדכון פרומפט' });
    }
});
exports.updatePrompt = updatePrompt;
const deletePrompt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prompt = yield models_1.Prompt.findByIdAndDelete(req.params.id);
        if (!prompt)
            return res.status(404).json({ error: 'פרומפט לא נמצא' });
        res.json({ message: 'פרומפט נמחק בהצלחה' });
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה במחיקת פרומפט' });
    }
});
exports.deletePrompt = deletePrompt;
