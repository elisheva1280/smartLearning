import connectDB from '../config/database';
import { Prompt } from '../models';

async function clearPrompts() {
    await connectDB();
    
    try {
        const result = await Prompt.deleteMany({});
        console.log(`נמחקו ${result.deletedCount} פרומפטים מהמסד`);
        
        if (result.deletedCount === 0) {
            console.log('לא היו פרומפטים למחיקה');
        } else {
            console.log('כל הפרומפטים נמחקו בהצלחה!');
        }
    } catch (error) {
        console.error('שגיאה במחיקת פרומפטים:', error);
    }
    
    process.exit(0);
}

clearPrompts().catch(err => {
    console.error('שגיאה:', err);
    process.exit(1);
});