import connectDB from '../config/database';
import { Category, SubCategory } from '../models';

async function removeUnwantedTopics() {
    await connectDB();
    
    // מחיקת קטגוריית פילוסופיה ומחשבה
    const philosophyCategory = await Category.findOne({ name: 'פילוסופיה ומחשבה' });
    if (philosophyCategory) {
        await SubCategory.deleteMany({ category_id: philosophyCategory._id });
        await Category.deleteOne({ _id: philosophyCategory._id });
        console.log('קטגוריית פילוסופיה ומחשבה נמחקה');
    }
    
    // מחיקת תת-קטגוריות הקשורות לדת
    const religiousSubCategories = [
        'היסטוריה יהודית ומסורת',
        'מחשבה יהודית עכשווית'
    ];
    
    for (const subCatName of religiousSubCategories) {
        const deleted = await SubCategory.deleteOne({ name: subCatName });
        if (deleted.deletedCount > 0) {
            console.log(`תת-קטגוריה "${subCatName}" נמחקה`);
        }
    }
    
    // הוספת תת-קטגוריות חלופיות להיסטוריה
    const historyCategory = await Category.findOne({ name: 'היסטוריה ותרבות' });
    if (historyCategory) {
        await SubCategory.insertMany([
            { name: 'היסטוריה של המדע והטכנולוגיה', category_id: historyCategory._id },
            { name: 'תרבות פופולרית ומדיה', category_id: historyCategory._id }
        ]);
        console.log('נוספו תת-קטגוריות חלופיות להיסטוריה');
    }
    
    console.log('הסרת נושאים לא רצויים הושלמה בהצלחה!');
    process.exit(0);
}

removeUnwantedTopics().catch(err => {
    console.error('שגיאה בהסרת נושאים:', err);
    process.exit(1);
});