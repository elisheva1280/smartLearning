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

async function checkUsers() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('מחובר למסד הנתונים');

        const users = await User.find({});
        console.log(`נמצאו ${users.length} משתמשים:`);
        
        users.forEach(user => {
            console.log(`שם: ${user.name}, שם משתמש: ${user.username}, טלפון: ${user.phone}, מנהל: ${user.isAdmin}`);
        });

        // בדיקה ספציפית למשתמש admin
        const adminUser = await User.findOne({ username: 'admindmin', phone: 'admin' });
        if (adminUser) {
            console.log('\nמשתמש admin נמצא!');
            console.log('פרטים:', {
                name: adminUser.name,
                username: adminUser.username,
                phone: adminUser.phone,
                hasPassword: !!adminUser.password,
                isAdmin: adminUser.isAdmin
            });
        } else {
            console.log('\nמשתמש admin לא נמצא עם הפרטים: username=admindmin, phone=admin');
        }

        process.exit(0);
    } catch (error) {
        console.error('שגיאה:', error);
        process.exit(1);
    }
}

checkUsers();