const mongoose = require('mongoose');
const User = require('./src/models/User.js').default;

async function checkAllUsers() {
  try {
    await mongoose.connect('mongodb://localhost:27017/SmartLearningDB');
    console.log('חיבור למסד הנתונים הצליח!');
    
    const users = await User.find();
    console.log(`סך הכל משתמשים: ${users.length}`);
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. שם: ${user.name}, טלפון: ${user.phone}, מנהל: ${user.isAdmin}`);
    });
    
    const admins = users.filter(user => user.isAdmin === true);
    console.log(`\nמנהלים במערכת: ${admins.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('שגיאה:', error);
    process.exit(1);
  }
}

checkAllUsers();