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
const database_1 = __importDefault(require("../config/database"));
const models_1 = require("../models");
function testPrompt() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, database_1.default)();
        try {
            // מציאת משתמש קיים
            const user = yield models_1.User.findOne({ name: 'admin' });
            if (!user) {
                console.log('לא נמצא משתמש admin');
                return;
            }
            console.log('נמצא משתמש:', user.name, user._id);
            // יצירת פרומפט בדיקה
            const testPrompt = new models_1.Prompt({
                user_id: user._id,
                prompt: 'שאלת בדיקה',
                response: 'תשובת בדיקה'
            });
            yield testPrompt.save();
            console.log('פרומפט נשמר בהצלחה:', testPrompt);
            // בדיקת כמות פרומפטים
            const count = yield models_1.Prompt.countDocuments();
            console.log('סך הכל פרומפטים במסד:', count);
        }
        catch (error) {
            console.error('שגיאה:', error);
        }
        process.exit(0);
    });
}
testPrompt();
