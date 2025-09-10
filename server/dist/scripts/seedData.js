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
function insertData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, database_1.default)();
        // בדיקה אם הנתונים כבר קיימים
        const existingUsers = yield models_1.User.countDocuments();
        if (existingUsers > 0) {
            console.log('הנתונים כבר קיימים במסד הנתונים');
            return;
        }
        const users = yield models_1.User.insertMany([
            { name: 'tamar', phone: '000' },
            { name: 'yael', phone: '3' },
            { name: 'eli7', phone: '2' }
        ]);
        const categories = yield models_1.Category.insertMany([
            { name: 'Math' },
            { name: 'Science' },
            { name: 'Language' }
        ]);
        const subCategories = yield models_1.SubCategory.insertMany([
            { name: 'Calculus', category_id: categories[0]._id },
            { name: 'Geometry', category_id: categories[0]._id },
            { name: 'Algebra', category_id: categories[0]._id },
            { name: 'Physics', category_id: categories[1]._id },
            { name: 'Biology', category_id: categories[1]._id },
            { name: 'Chemistry', category_id: categories[1]._id },
            { name: 'Hebrew', category_id: categories[2]._id },
            { name: 'Spanish', category_id: categories[2]._id },
            { name: 'French', category_id: categories[2]._id }
        ]);
        yield models_1.Prompt.insertMany([
            { user_id: users[0]._id, category_id: categories[0]._id, sub_category_id: subCategories[0]._id, prompt: 'Prompt 1', response: 'Response 1' },
            { user_id: users[1]._id, category_id: categories[0]._id, sub_category_id: subCategories[0]._id, prompt: 'Prompt 2', response: 'Response 2' },
            { user_id: users[2]._id, category_id: categories[1]._id, sub_category_id: subCategories[0]._id, prompt: 'Prompt 3', response: 'Response 3' }
        ]);
    });
}
insertData().then(() => {
    console.log('נתונים הוכנסו בהצלחה');
    process.exit(0);
}).catch(err => {
    console.error('שגיאה בהכנסת נתונים:', err);
    process.exit(1);
});
