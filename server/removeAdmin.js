const mongoose = require('mongoose');
const User = require('./src/models/User.js').default;

async function removeAdmin() {
  try {
    await mongoose.connect('mongodb://localhost:27017/SmartLearningDB');
    console.log('חיבור למסד הנתונים הצליח!');
    
    const result = await User.updateOne(
      { name: 'רבקה', phone: '2' },
      { isAdmin: false }
    );
    
    console.log('תוצאת העדכון:', result);
    
    // בדיקה שהעדכון עבד
    const updatedUser = await User.findOne({ name: 'רבקה', phone: '2' });
    console.log('לאחר העדכון - מנהל:', updatedUser.isAdmin);
    
    process.exit(0);
  } catch (error) {
    console.error('שגיאה:', error);
    process.exit(1);
  }
}

removeAdmin();