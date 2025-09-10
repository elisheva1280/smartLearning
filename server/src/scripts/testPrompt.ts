import connectDB from '../config/database';
import { Prompt, User } from '../models';

async function testPrompt() {
    await connectDB();
    
    try {
        // מציאת משתמש קיים
        const user = await User.findOne({ name: 'admin' });
        if (!user) {
            console.log('לא נמצא משתמש admin');
            return;
        }
        
        console.log('נמצא משתמש:', user.name, user._id);
        
        // יצירת פרומפט בדיקה
        const testPrompt = new Prompt({
            user_id: user._id,
            prompt: 'שאלת בדיקה',
            response: 'תשובת בדיקה'
        });
        
        await testPrompt.save();
        console.log('פרומפט נשמר בהצלחה:', testPrompt);
        
        // בדיקת כמות פרומפטים
        const count = await Prompt.countDocuments();
        console.log('סך הכל פרומפטים במסד:', count);
        
    } catch (error) {
        console.error('שגיאה:', error);
    }
    
    process.exit(0);
}

testPrompt();