

import mongoose, { Document, Schema } from 'mongoose';

// חיבור למונגוDB
mongoose.connect('mongodb://localhost:27017/SmartLearning')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Connection error:', err);
    });

// מודל Users
interface IUser extends Document {
    name: string;
    phone: string;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    phone: { type: String, required: true }
});

const User = mongoose.model<IUser>('User', userSchema);

// מודל Categories
interface ICategory extends Document {
    name: string;
}

const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true }
});

const Category = mongoose.model<ICategory>('Category', categorySchema);

// מודל Sub Categories
interface ISubCategory extends Document {
    name: string;
    category_id: mongoose.Types.ObjectId;
}

const subCategorySchema = new Schema<ISubCategory>({
    name: { type: String, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

const SubCategory = mongoose.model<ISubCategory>('SubCategory', subCategorySchema);

// מודל Prompts
interface IPrompt extends Document {
    user_id: mongoose.Types.ObjectId;
    category_id: mongoose.Types.ObjectId;
    sub_category_id: mongoose.Types.ObjectId;
    prompt: string;
    response: string;
    create_at: Date;
}

const promptSchema = new Schema<IPrompt>({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    sub_category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    create_at: { type: Date, default: Date.now }
});

const Prompt = mongoose.model<IPrompt>('Prompt', promptSchema);

// הכנסת נתונים
async function insertData() {
    // הכנסת משתמשים
    const users = await User.insertMany([
        { name: 'tamar', phone: '000' },
        { name: 'yael', phone: '3' },
        { name: 'eli7', phone: '2' }
    ]);

    // הכנסת קטגוריות
    const categories = await Category.insertMany([
        { name: 'Math' },
        { name: 'Science' },
        { name: 'Language' }
    ]);

    // הכנסת תתי קטגוריות
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

    // הכנסת פרומפטים
    await Prompt.insertMany([
        { user_id: users[0]._id, category_id: categories[0]._id, sub_category_id: subCategories[0]._id, prompt: 'Prompt 1', response: 'Response 1' },
        { user_id: users[1]._id, category_id: categories[0]._id, sub_category_id: subCategories[0]._id, prompt: 'Prompt 2', response: 'Response 2' },
        { user_id: users[2]._id, category_id: categories[1]._id, sub_category_id: subCategories[0]._id, prompt: 'Prompt 3', response: 'Response 3' }
    ]);
}

// הפעלת הפונקציה
insertData().then(() => {
    console.log('Data inserted successfully');
    mongoose.connection.close();
}).catch(err => {
    console.error('Error inserting data:', err);
});

