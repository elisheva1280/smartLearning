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

async function addUsernameToExistingUsers() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('מחובר למסד הנתונים');

        const usersWithoutUsername = await User.find({ username: { $exists: false } });
        console.log(`נמצאו ${usersWithoutUsername.length} משתמשים ללא שם משתמש`);

        for (const user of usersWithoutUsername) {
            // יצירת שם משתמש: שם + 4 ספרות אחרונות של הטלפון
            let baseUsername = user.name.replace(/\s+/g, '') + user.phone.slice(-4);
            let username = baseUsername;
            let counter = 1;
            
            // בדיקה שהשם משתמש לא קיים כבר
            while (await User.findOne({ username })) {
                username = baseUsername + counter;
                counter++;
            }
            
            user.username = username;
            await user.save();
            
            console.log(`עודכן משתמש: ${user.name} - שם משתמש: ${username}`);
        }

        console.log('סיום עדכון משתמשים');
        process.exit(0);
    } catch (error) {
        console.error('שגיאה:', error);
        process.exit(1);
    }
}

addUsernameToExistingUsers();