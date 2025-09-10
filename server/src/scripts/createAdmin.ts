import connectDB from '../config/database';
import { User } from '../models';

async function createAdmin() {
    await connectDB();
    
    // בדיקה אם המנהל כבר קיים
    const existingAdmin = await User.findOne({ name: 'admin', phone: 'admin' });
    if (existingAdmin) {
        console.log('מנהל כבר קיים במערכת');
        return;
    }
    
    // יצירת משתמש מנהל
    const admin = new User({
        name: 'admin',
        phone: 'admin',
        isAdmin: true
    });
    
    await admin.save();
    console.log('משתמש מנהל נוצר בהצלחה!');
    console.log('שם: admin');
    console.log('טלפון: admin');
    
    process.exit(0);
}

createAdmin().catch(err => {
    console.error('שגיאה ביצירת מנהל:', err);
    process.exit(1);
});