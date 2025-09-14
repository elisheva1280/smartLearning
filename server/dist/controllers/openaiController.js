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
exports.generateResponse = void 0;
const axios_1 = __importDefault(require("axios"));
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const generateResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { prompt, category, subcategory } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }
        // יצירת פרומפט מורחב עם קונטקסט
        const contextualPrompt = `בתחום ${category || 'כללי'} ובנושא ${subcategory || 'כללי'}, ${prompt}`;
        // נסיון לשלוח ל-OpenAI
        try {
            const result = yield axios_1.default.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-3.5-turbo",
                messages: [{
                        role: "user",
                        content: contextualPrompt
                    }],
                max_tokens: 1200,
                temperature: 0.7
            }, {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });
            res.json({ response: result.data.choices[0].message.content });
        }
        catch (openaiError) {
            console.error('OpenAI API Error:', ((_a = openaiError.response) === null || _a === void 0 ? void 0 : _a.data) || openaiError.message);
            // החזרת שגיאה מפורטת למשתמש
            let errorMessage = 'שירות ה-AI זמנית לא זמין';
            if (((_b = openaiError.response) === null || _b === void 0 ? void 0 : _b.status) === 401) {
                errorMessage = 'שגיאה באימות - מפתח API לא תקין';
            }
            else if (((_c = openaiError.response) === null || _c === void 0 ? void 0 : _c.status) === 429) {
                errorMessage = 'חרגנו ממכסת השימוש - נסה שוב מאוחר יותר';
            }
            else if (openaiError.code === 'ENOTFOUND' || openaiError.code === 'ECONNREFUSED') {
                errorMessage = 'אין חיבור לאינטרנט או שהשירות חסום';
            }
            return res.status(503).json({
                error: errorMessage,
                isAIError: true
            });
        }
    }
    catch (error) {
        console.error('General error:', error);
        res.status(500).json({ error: 'שגיאה כללית בשרת' });
    }
});
exports.generateResponse = generateResponse;
