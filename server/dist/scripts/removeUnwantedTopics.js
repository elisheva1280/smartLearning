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
function removeUnwantedTopics() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, database_1.default)();
        // מחיקת קטגוריית פילוסופיה ומחשבה
        const philosophyCategory = yield models_1.Category.findOne({ name: 'פילוסופיה ומחשבה' });
        if (philosophyCategory) {
            yield models_1.SubCategory.deleteMany({ category_id: philosophyCategory._id });
            yield models_1.Category.deleteOne({ _id: philosophyCategory._id });
            console.log('קטגוריית פילוסופיה ומחשבה נמחקה');
        }
        // מחיקת תת-קטגוריות הקשורות לדת
        const religiousSubCategories = [
            'היסטוריה יהודית ומסורת',
            'מחשבה יהודית עכשווית'
        ];
        for (const subCatName of religiousSubCategories) {
            const deleted = yield models_1.SubCategory.deleteOne({ name: subCatName });
            if (deleted.deletedCount > 0) {
                console.log(`תת-קטגוריה "${subCatName}" נמחקה`);
            }
        }
        // הוספת תת-קטגוריות חלופיות להיסטוריה
        const historyCategory = yield models_1.Category.findOne({ name: 'היסטוריה ותרבות' });
        if (historyCategory) {
            yield models_1.SubCategory.insertMany([
                { name: 'היסטוריה של המדע והטכנולוגיה', category_id: historyCategory._id },
                { name: 'תרבות פופולרית ומדיה', category_id: historyCategory._id }
            ]);
            console.log('נוספו תת-קטגוריות חלופיות להיסטוריה');
        }
        console.log('הסרת נושאים לא רצויים הושלמה בהצלחה!');
        process.exit(0);
    });
}
removeUnwantedTopics().catch(err => {
    console.error('שגיאה בהסרת נושאים:', err);
    process.exit(1);
});
