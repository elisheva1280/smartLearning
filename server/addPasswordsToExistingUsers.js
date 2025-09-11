const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String },
    isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

async function addPasswordsToExistingUsers() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('מחובר למסד הנתונים');

        const usersWithoutPassword = await User.find({ password: { $exists: false } });
        console.log(`נמצאו ${usersWithoutPassword.length} משתמשים ללא סיסמה`);

        for (const user of usersWithoutPassword) {
            // סיסמה זמנית: שם + 4 ספרות אחרונות של הטלפון
            const tempPassword = user.name + user.phone.slice(-4);
            const hashedPassword = await bcrypt.hash(tempPassword, 10);
            
            user.password = hashedPassword;
            await user.save();
            
            console.log(`עודכן משתמש: ${user.name} - סיסמה זמנית: ${tempPassword}`);
        }

        console.log('סיום עדכון משתמשים');
        process.exit(0);
    } catch (error) {
        console.error('שגיאה:', error);
        process.exit(1);
    }
}

addPasswordsToExistingUsers();