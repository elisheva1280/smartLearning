"use strict";
// src/index.ts
// import express from 'express';
// import connectDB from './db';
// import User from './models/User';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
// const app = express();
// const PORT = process.env.PORT || 3000;
// app.use(express.json()); // Middleware to parse JSON
// connectDB();
// app.post('/users', async (req, res) => {
//     const { name, phone} = req.body;
//     const newUser = new User({ name, phone});
//     try {
//         await newUser.save();
//         res.status(201).send('משתמש נוסף בהצלחה!');
//     }  catch (error) {
//     if (error instanceof Error) {
//         res.status(400).send('שגיאה בהוספת המשתמש: ' + error.message);
//     } else {
//         res.status(400).send('שגיאה לא ידועה בהוספת המשתמש');
//     }
// }
// });
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
const mongoose_1 = __importStar(require("mongoose"));
// חיבור למונגוDB
mongoose_1.default.connect('mongodb://localhost:27017/SmartLearning')
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch(err => {
    console.error('Connection error:', err);
});
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true }
});
const User = mongoose_1.default.model('User', userSchema);
const categorySchema = new mongoose_1.Schema({
    name: { type: String, required: true }
});
const Category = mongoose_1.default.model('Category', categorySchema);
const subCategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    category_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Category' }
});
const SubCategory = mongoose_1.default.model('SubCategory', subCategorySchema);
const promptSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    category_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Category' },
    sub_category_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'SubCategory' },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    create_at: { type: Date, default: Date.now }
});
const Prompt = mongoose_1.default.model('Prompt', promptSchema);
// הכנסת נתונים
function insertData() {
    return __awaiter(this, void 0, void 0, function* () {
        // הכנסת משתמשים
        const users = yield User.insertMany([
            { name: 'tamar', phone: '000' },
            { name: 'yael', phone: '3' },
            { name: 'eli7', phone: '2' }
        ]);
        // הכנסת קטגוריות
        const categories = yield Category.insertMany([
            { name: 'Math' },
            { name: 'Science' },
            { name: 'Language' }
        ]);
        // הכנסת תתי קטגוריות
        const subCategories = yield SubCategory.insertMany([
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
        // הכנסת פרומפטים
        yield Prompt.insertMany([
            { user_id: users[0]._id, category_id: categories[0]._id, sub_category_id: subCategories[0]._id, prompt: 'Prompt 1', response: 'Response 1' },
            { user_id: users[1]._id, category_id: categories[0]._id, sub_category_id: subCategories[0]._id, prompt: 'Prompt 2', response: 'Response 2' },
            { user_id: users[2]._id, category_id: categories[1]._id, sub_category_id: subCategories[0]._id, prompt: 'Prompt 3', response: 'Response 3' }
        ]);
    });
}
// הפעלת הפונקציה
insertData().then(() => {
    console.log('Data inserted successfully');
    mongoose_1.default.connection.close();
}).catch(err => {
    console.error('Error inserting data:', err);
});
