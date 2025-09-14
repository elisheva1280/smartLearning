import connectDB from '../config/database';
import { Category, SubCategory } from '../models';

async function addAdvancedTopics() {
    await connectDB();
    
    // נושאים חדשים ומעניינים
    const newCategories = await Category.insertMany([
        { name: 'טכנולוגיה ומחשבים' },
        { name: 'פסיכולוגיה ופיתוח אישי' },
        { name: 'עסקים וכלכלה' },
        { name: 'אמנות ויצירה' },
        { name: 'בריאות ורפואה' },
        { name: 'היסטוריה ותרבות' },
        { name: 'פילוסופיה ומחשבה' },
        { name: 'מדעי החברה' },
        { name: 'סביבה וקיימות' },
        { name: 'ספורט וכושר' }
    ]);

    // תת-נושאים מפורטים לכל קטגוריה
    const subCategories = [
        // טכנולוגיה ומחשבים
        { name: 'בינה מלאכותית ולמידת מכונה', category_id: newCategories[0]._id },
        { name: 'פיתוח אפליקציות ואתרים', category_id: newCategories[0]._id },
        { name: 'אבטחת מידע וסייבר', category_id: newCategories[0]._id },
        { name: 'מדעי הנתונים ואנליטיקה', category_id: newCategories[0]._id },
        { name: 'רובוטיקה ואוטומציה', category_id: newCategories[0]._id },

        // פסיכולוגיה ופיתוח אישי
        { name: 'פסיכולוגיה קוגניטיבית', category_id: newCategories[1]._id },
        { name: 'מנהיגות וניהול צוותים', category_id: newCategories[1]._id },
        { name: 'טכניקות למידה יעילות', category_id: newCategories[1]._id },
        { name: 'ניהול זמן ופרודוקטיביות', category_id: newCategories[1]._id },
        { name: 'בניית ביטחון עצמי', category_id: newCategories[1]._id },

        // עסקים וכלכלה
        { name: 'יזמות וסטארט-אפים', category_id: newCategories[2]._id },
        { name: 'שיווק דיגיטלי ומדיה חברתית', category_id: newCategories[2]._id },
        { name: 'השקעות ושוק ההון', category_id: newCategories[2]._id },
        { name: 'ניהול פרויקטים', category_id: newCategories[2]._id },
        { name: 'כלכלה התנהגותית', category_id: newCategories[2]._id },

        // אמנות ויצירה
        { name: 'עיצוב גרפי ואמנות דיגיטלית', category_id: newCategories[3]._id },
        { name: 'צילום מקצועי', category_id: newCategories[3]._id },
        { name: 'כתיבה יצירתית וספרות', category_id: newCategories[3]._id },
        { name: 'מוזיקה ויצירה מוזיקלית', category_id: newCategories[3]._id },
        { name: 'אמנות קולינרית ובישול', category_id: newCategories[3]._id },

        // בריאות ורפואה
        { name: 'תזונה מותאמת אישית', category_id: newCategories[4]._id },
        { name: 'רפואה משלימה וטבעית', category_id: newCategories[4]._id },
        { name: 'בריאות נפשית ורווחה', category_id: newCategories[4]._id },
        { name: 'מדיטציה ומיינדפולנס', category_id: newCategories[4]._id },
        { name: 'פיזיותרפיה ושיקום', category_id: newCategories[4]._id },

        // היסטוריה ותרבות
        { name: 'היסטוריה של המזרח התיכון', category_id: newCategories[5]._id },
        { name: 'תרבויות עולם ואנתרופולוגיה', category_id: newCategories[5]._id },
        { name: 'ארכיאולוגיה ועתיקות', category_id: newCategories[5]._id },
        { name: 'היסטוריה יהודית ומסורת', category_id: newCategories[5]._id },
        { name: 'אמנות לאורך ההיסטוריה', category_id: newCategories[5]._id },

        // פילוסופיה ומחשבה
        { name: 'אתיקה ומוסר', category_id: newCategories[6]._id },
        { name: 'פילוסופיה מזרחית', category_id: newCategories[6]._id },
        { name: 'פילוסופיה של המדע', category_id: newCategories[6]._id },
        { name: 'פילוסופיה פוליטית', category_id: newCategories[6]._id },
        { name: 'מחשבה יהודית עכשווית', category_id: newCategories[6]._id },

        // מדעי החברה
        { name: 'סוציולוגיה עכשווית', category_id: newCategories[7]._id },
        { name: 'מדעי המדינה ויחסים בינלאומיים', category_id: newCategories[7]._id },
        { name: 'קרימינולוגיה ומשפט', category_id: newCategories[7]._id },
        { name: 'גיאוגרפיה אנושית', category_id: newCategories[7]._id },
        { name: 'תקשורת ומדיה', category_id: newCategories[7]._id },

        // סביבה וקיימות
        { name: 'שינויי אקלים וחממה', category_id: newCategories[8]._id },
        { name: 'אנרגיות מתחדשות', category_id: newCategories[8]._id },
        { name: 'חקלאות בת קיימא', category_id: newCategories[8]._id },
        { name: 'שימור טבע ומגוון ביולוגי', category_id: newCategories[8]._id },
        { name: 'עיצוב אקולוגי וארכיטקטורה ירוקה', category_id: newCategories[8]._id },

        // ספורט וכושר
        { name: 'אימון כוח ובניית שריר', category_id: newCategories[9]._id },
        { name: 'ריצה ואימוני סיבולת', category_id: newCategories[9]._id },
        { name: 'יוגה ופילאטיס', category_id: newCategories[9]._id },
        { name: 'ספורט מים ושחייה', category_id: newCategories[9]._id },
        { name: 'ספורט קיצוני והרפתקאות', category_id: newCategories[9]._id }
    ];

    await SubCategory.insertMany(subCategories);
    
    console.log('נושאים מתקדמים נוספו בהצלחה!');
    console.log(`נוספו ${newCategories.length} קטגוריות ו-${subCategories.length} תת-קטגוריות`);
    
    process.exit(0);
}

addAdvancedTopics().catch(err => {
    console.error('שגיאה בהוספת נושאים:', err);
    process.exit(1);
});