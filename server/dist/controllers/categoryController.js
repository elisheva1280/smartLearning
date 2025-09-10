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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const models_1 = require("../models");
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield models_1.Category.find();
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה בקבלת קטגוריות' });
    }
});
exports.getAllCategories = getAllCategories;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield models_1.Category.findById(req.params.id);
        if (!category)
            return res.status(404).json({ error: 'קטגוריה לא נמצאה' });
        res.json(category);
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה בקבלת קטגוריה' });
    }
});
exports.getCategoryById = getCategoryById;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const category = new models_1.Category({ name });
        yield category.save();
        res.status(201).json(category);
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה ביצירת קטגוריה' });
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield models_1.Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category)
            return res.status(404).json({ error: 'קטגוריה לא נמצאה' });
        res.json(category);
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה בעדכון קטגוריה' });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield models_1.Category.findByIdAndDelete(req.params.id);
        if (!category)
            return res.status(404).json({ error: 'קטגוריה לא נמצאה' });
        res.json({ message: 'קטגוריה נמחקה בהצלחה' });
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה במחיקת קטגוריה' });
    }
});
exports.deleteCategory = deleteCategory;
