const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// חיבור למסד הנתונים
mongoose.connect('mongodb://localhost:27017/SmartLearning', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// הגדרת סכמת המשתמש
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    // בדיקה אם כבר קיים מנהל
    const existingAdmin = await User.findOne({ isAdmin: true });
    if (existingAdmin) {
      console.log('מנהל כבר קיים:', existingAdmin.name);
      process.exit(0);
    }

    // יצירת מנהל חדש
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      name: 'admin',
      username: 'admin',
      phone: 'admin',
      password: hashedPassword,
      isAdmin: true
    });

    await admin.save();
    console.log('מנהל נוצר בהצלחה!');
    console.log('שם: admin');
    console.log('טלפון: admin');
    console.log('סיסמה: admin123');
    
  } catch (error) {
    console.error('שגיאה ביצירת מנהל:', error);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();