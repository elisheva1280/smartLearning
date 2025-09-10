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
exports.deleteSubCategory = exports.updateSubCategory = exports.createSubCategory = exports.getSubCategoriesByCategory = exports.getSubCategoryById = exports.getAllSubCategories = void 0;
const models_1 = require("../models");
const getAllSubCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subCategories = yield models_1.SubCategory.find().populate('category_id');
        res.json(subCategories);
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה בקבלת תת-קטגוריות' });
    }
});
exports.getAllSubCategories = getAllSubCategories;
const getSubCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subCategory = yield models_1.SubCategory.findById(req.params.id).populate('category_id');
        if (!subCategory)
            return res.status(404).json({ error: 'תת-קטגוריה לא נמצאה' });
        res.json(subCategory);
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה בקבלת תת-קטגוריה' });
    }
});
exports.getSubCategoryById = getSubCategoryById;
const getSubCategoriesByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield models_1.Category.findOne({ name: req.params.categoryId });
        if (!category)
            return res.status(404).json({ error: 'קטגוריה לא נמצאה' });
        const subCategories = yield models_1.SubCategory.find({ category_id: category._id });
        res.json(subCategories);
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה בקבלת תת-קטגוריות לפי קטגוריה' });
    }
});
exports.getSubCategoriesByCategory = getSubCategoriesByCategory;
const createSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, category_id } = req.body;
        const subCategory = new models_1.SubCategory({ name, category_id });
        yield subCategory.save();
        res.status(201).json(subCategory);
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה ביצירת תת-קטגוריה' });
    }
});
exports.createSubCategory = createSubCategory;
const updateSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subCategory = yield models_1.SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!subCategory)
            return res.status(404).json({ error: 'תת-קטגוריה לא נמצאה' });
        res.json(subCategory);
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה בעדכון תת-קטגוריה' });
    }
});
exports.updateSubCategory = updateSubCategory;
const deleteSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subCategory = yield models_1.SubCategory.findByIdAndDelete(req.params.id);
        if (!subCategory)
            return res.status(404).json({ error: 'תת-קטגוריה לא נמצאה' });
        res.json({ message: 'תת-קטגוריה נמחקה בהצלחה' });
    }
    catch (error) {
        res.status(500).json({ error: 'שגיאה במחיקת תת-קטגוריה' });
    }
});
exports.deleteSubCategory = deleteSubCategory;
