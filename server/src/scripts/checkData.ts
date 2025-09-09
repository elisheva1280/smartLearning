import connectDB from '../config/database';
import { User, Category, SubCategory, Prompt } from '../models';

async function checkData() {
    await connectDB();
    
    const userCount = await User.countDocuments();
    const categoryCount = await Category.countDocuments();
    const subCategoryCount = await SubCategory.countDocuments();
    const promptCount = await Prompt.countDocuments();
    
    console.log(`משתמשים: ${userCount}`);
    console.log(`קטגוריות: ${categoryCount}`);
    console.log(`תת-קטגוריות: ${subCategoryCount}`);
    console.log(`פרומפטים: ${promptCount}`);
    
    if (userCount > 0) {
        const users = await User.find().limit(3);
        console.log('דוגמת משתמשים:', users);
    }
    
    process.exit(0);
}

checkData().catch(err => {
    console.error('שגיאה:', err);
    process.exit(1);
});