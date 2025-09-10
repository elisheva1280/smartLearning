const mongoose = require('mongoose');
const User = require('./src/models/User.js').default;

async function checkSpecificUser() {
  try {
    await mongoose.connect('mongodb://localhost:27017/SmartLearningDB');
    console.log('חיבור למסד הנתונים הצליח!');
    
    const user = await User.findOne({ name: 'רבקה', phone: '2' });
    
    if (user) {
      console.log('משתמש נמצא:');
      console.log('שם:', user.name);
      console.log('טלפון:', user.phone);
      console.log('מנהל:', user.isAdmin);
      console.log('סוג של isAdmin:', typeof user.isAdmin);
      console.log('האובייקט המלא:', JSON.stringify(user, null, 2));
    } else {
      console.log('משתמש לא נמצא');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('שגיאה:', error);
    process.exit(1);
  }
}

checkSpecificUser();