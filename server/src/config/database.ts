import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/SmartLearningDB';

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('חיבור למסד הנתונים הצליח!');
    } catch (error) {
        console.error('שגיאה בחיבור למסד הנתונים:', error);
        console.log('נסה שוב ב-5 שניות...');
        setTimeout(() => connectDB(), 5000);
    }
};

export default connectDB;