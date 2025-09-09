import connectDB from '../config/database';
import { User, Category, SubCategory, Prompt } from '../models';

async function insertData() {
    await connectDB();
    
    // בדיקה אם הנתונים כבר קיימים
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
        console.log('הנתונים כבר קיימים במסד הנתונים');
        return;
    }
    
    const users = await User.insertMany([
        { name: 'tamar', phone: '000' },
        { name: 'yael', phone: '3' },
        { name: 'eli7', phone: '2' }
    ]);

    const categories = await Category.insertMany([
        { name: 'Math' },
        { name: 'Science' },
        { name: 'Language' }
    ]);

    const subCategories = await SubCategory.insertMany([
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

    await Prompt.insertMany([
        { user_id: users[0]._id, category_id: categories[0]._id, sub_category_id: subCategories[0]._id, prompt: 'Prompt 1', response: 'Response 1' },
        { user_id: users[1]._id, category_id: categories[0]._id, sub_category_id: subCategories[0]._id, prompt: 'Prompt 2', response: 'Response 2' },
        { user_id: users[2]._id, category_id: categories[1]._id, sub_category_id: subCategories[0]._id, prompt: 'Prompt 3', response: 'Response 3' }
    ]);
}

insertData().then(() => {
    console.log('נתונים הוכנסו בהצלחה');
    process.exit(0);
}).catch(err => {
    console.error('שגיאה בהכנסת נתונים:', err);
    process.exit(1);
});