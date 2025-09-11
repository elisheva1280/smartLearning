const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

async function checkAdminData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('מחובר למסד הנתונים');

        const adminUser = await User.findOne({ name: 'admin' });
        if (adminUser) {
            console.log('נתוני המנהל:');
            console.log('שם:', adminUser.name);
            console.log('שם משתמש:', adminUser.username);
            console.log('טלפון:', adminUser.phone);
            console.log('מנהל:', adminUser.isAdmin);
        } else {
            console.log('משתמש admin לא נמצא');
        }

        process.exit(0);
    } catch (error) {
        console.error('שגיאה:', error);
        process.exit(1);
    }
}

checkAdminData();