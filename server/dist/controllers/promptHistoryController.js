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
exports.clearUserHistory = exports.getUserHistory = exports.savePromptHistory = void 0;
const models_1 = require("../models");
const savePromptHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, category, subcategory, prompt, response } = req.body;
        const historyItem = new models_1.PromptHistory({
            userId,
            category,
            subcategory,
            prompt,
            response
        });
        yield historyItem.save();
        res.status(201).json({ message: 'History saved successfully' });
    }
    catch (error) {
        console.error('Error saving history:', error);
        res.status(500).json({ error: 'Failed to save history' });
    }
});
exports.savePromptHistory = savePromptHistory;
const getUserHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const history = yield models_1.PromptHistory.find({ userId })
            .sort({ timestamp: -1 })
            .limit(100);
        res.json(history);
    }
    catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});
exports.getUserHistory = getUserHistory;
const clearUserHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        yield models_1.PromptHistory.deleteMany({ userId });
        res.json({ message: 'History cleared successfully' });
    }
    catch (error) {
        console.error('Error clearing history:', error);
        res.status(500).json({ error: 'Failed to clear history' });
    }
});
exports.clearUserHistory = clearUserHistory;
