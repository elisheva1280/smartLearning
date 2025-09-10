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
    var _a, _b, _c, _d, _e, _f, _g;
    console.log('OpenAI endpoint called with prompt:', req.body);
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }
        const result = yield axios_1.default.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{
                    role: "user",
                    content: prompt
                }],
            max_tokens: 200,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        res.json({ response: result.data.choices[0].message.content });
    }
    catch (error) {
        console.error('OpenAI API Error Details:');
        console.error('Status:', (_a = error.response) === null || _a === void 0 ? void 0 : _a.status);
        console.error('Data:', (_b = error.response) === null || _b === void 0 ? void 0 : _b.data);
        console.error('Message:', error.message);
        let errorMessage = 'Failed to generate response';
        if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
            errorMessage = 'Network connection blocked - possibly by NetFree or firewall';
        }
        else if (((_c = error.response) === null || _c === void 0 ? void 0 : _c.status) === 401) {
            errorMessage = 'Invalid API key';
        }
        else if (((_d = error.response) === null || _d === void 0 ? void 0 : _d.status) === 429) {
            errorMessage = 'Rate limit exceeded';
        }
        else if ((_g = (_f = (_e = error.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.error) === null || _g === void 0 ? void 0 : _g.message) {
            errorMessage = error.response.data.error.message;
        }
        res.status(500).json({ error: errorMessage });
    }
});
exports.generateResponse = generateResponse;
