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
function fixCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, database_1.default)();
        // מחיקת התוספות החדשות מההיסטוריה
        yield models_1.SubCategory.deleteMany({
            name: { $in: ['היסטוריה של המדע והטכנולוגיה', 'תרבות פופולרית ומדיה'] }
        });
        console.log('התוספות החדשות נמחקו');
        // מחיקת כל הקטגוריות והתת-קטגוריות הקיימות
        yield models_1.SubCategory.deleteMany({});
        yield models_1.Category.deleteMany({});
        console.log('כל הקטגוריות נמחקו');
        // יצירת קטגוריות חדשות עם בדיוק 5 תת-נושאים לכל אחת
        const categories = yield models_1.Category.insertMany([
            { name: 'מתמטיקה' },
            { name: 'מדעים' },
            { name: 'שפות' },
            { name: 'טכנולוגיה ומחשבים' },
            { name: 'פסיכולוגיה ופיתוח אישי' },
            { name: 'עסקים וכלכלה' },
            { name: 'אמנות ויצירה' },
            { name: 'בריאות ורפואה' },
            { name: 'היסטוריה ותרבות' },
            { name: 'מדעי החברה' },
            { name: 'סביבה וקיימות' },
            { name: 'ספורט וכושר' }
        ]);
        // תת-נושאים - בדיוק 5 לכל קטגוריה
        const subCategories = [
            // מתמטיקה
            { name: 'אלגברה', category_id: categories[0]._id },
            { name: 'גיאומטריה', category_id: categories[0]._id },
            { name: 'חשבון דיפרנציאלי ואינטגרלי', category_id: categories[0]._id },
            { name: 'סטטיסטיקה והסתברות', category_id: categories[0]._id },
            { name: 'מתמטיקה דיסקרטית', category_id: categories[0]._id },
            // מדעים
            { name: 'פיזיקה', category_id: categories[1]._id },
            { name: 'כימיה', category_id: categories[1]._id },
            { name: 'ביולוגיה', category_id: categories[1]._id },
            { name: 'מדעי כדור הארץ', category_id: categories[1]._id },
            { name: 'אסטרונומיה', category_id: categories[1]._id },
            // שפות
            { name: 'אנגלית', category_id: categories[2]._id },
            { name: 'עברית', category_id: categories[2]._id },
            { name: 'ספרדית', category_id: categories[2]._id },
            { name: 'צרפתית', category_id: categories[2]._id },
            { name: 'גרמנית', category_id: categories[2]._id },
            // טכנולוגיה ומחשבים
            { name: 'תכנות ופיתוח', category_id: categories[3]._id },
            { name: 'בינה מלאכותית', category_id: categories[3]._id },
            { name: 'אבטחת מידע', category_id: categories[3]._id },
            { name: 'מדעי הנתונים', category_id: categories[3]._id },
            { name: 'עיצוב UX/UI', category_id: categories[3]._id },
            // פסיכולוגיה ופיתוח אישי
            { name: 'פסיכולוגיה קוגניטיבית', category_id: categories[4]._id },
            { name: 'מנהיגות וניהול', category_id: categories[4]._id },
            { name: 'טכניקות למידה', category_id: categories[4]._id },
            { name: 'ניהול זמן', category_id: categories[4]._id },
            { name: 'בניית ביטחון עצמי', category_id: categories[4]._id },
            // עסקים וכלכלה
            { name: 'יזמות וסטארט-אפים', category_id: categories[5]._id },
            { name: 'שיווק דיגיטלי', category_id: categories[5]._id },
            { name: 'השקעות ומסחר', category_id: categories[5]._id },
            { name: 'ניהול פרויקטים', category_id: categories[5]._id },
            { name: 'כלכלה מקרו ומיקרו', category_id: categories[5]._id },
            // אמנות ויצירה
            { name: 'עיצוב גרפי', category_id: categories[6]._id },
            { name: 'צילום', category_id: categories[6]._id },
            { name: 'כתיבה יצירתית', category_id: categories[6]._id },
            { name: 'מוזיקה', category_id: categories[6]._id },
            { name: 'בישול ואפייה', category_id: categories[6]._id },
            // בריאות ורפואה
            { name: 'תזונה בריאה', category_id: categories[7]._id },
            { name: 'רפואה משלימה', category_id: categories[7]._id },
            { name: 'בריאות נפשית', category_id: categories[7]._id },
            { name: 'מדיטציה ומיינדפולנס', category_id: categories[7]._id },
            { name: 'פיזיותרפיה', category_id: categories[7]._id },
            // היסטוריה ותרבות
            { name: 'היסטוריה עולמית', category_id: categories[8]._id },
            { name: 'תרבויות עולם', category_id: categories[8]._id },
            { name: 'ארכיאולוגיה', category_id: categories[8]._id },
            { name: 'אמנות לאורך ההיסטוריה', category_id: categories[8]._id },
            { name: 'גיאוגרפיה', category_id: categories[8]._id },
            // מדעי החברה
            { name: 'סוציולוגיה', category_id: categories[9]._id },
            { name: 'מדעי המדינה', category_id: categories[9]._id },
            { name: 'משפטים', category_id: categories[9]._id },
            { name: 'תקשורת ומדיה', category_id: categories[9]._id },
            { name: 'יחסים בינלאומיים', category_id: categories[9]._id },
            // סביבה וקיימות
            { name: 'שינויי אקלים', category_id: categories[10]._id },
            { name: 'אנרגיות מתחדשות', category_id: categories[10]._id },
            { name: 'חקלאות בת קיימא', category_id: categories[10]._id },
            { name: 'שימור טבע', category_id: categories[10]._id },
            { name: 'ארכיטקטורה ירוקה', category_id: categories[10]._id },
            // ספורט וכושר
            { name: 'אימון כוח', category_id: categories[11]._id },
            { name: 'ריצה וסיבולת', category_id: categories[11]._id },
            { name: 'יוגה ופילאטיס', category_id: categories[11]._id },
            { name: 'ספורט מים', category_id: categories[11]._id },
            { name: 'אומנויות לחימה', category_id: categories[11]._id }
        ];
        yield models_1.SubCategory.insertMany(subCategories);
        console.log('הקטגוריות עודכנו בהצלחה!');
        console.log(`נוצרו ${categories.length} קטגוריות עם ${subCategories.length} תת-קטגוריות (5 לכל קטגוריה)`);
        process.exit(0);
    });
}
fixCategories().catch(err => {
    console.error('שגיאה בעדכון קטגוריות:', err);
    process.exit(1);
});
