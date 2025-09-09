import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/SmartLearningDB';

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('חיבור למסד הנתונים הצליח!');
    } catch (error) {
        console.error('שגיאה בחיבור למסד הנתונים:', error);
        process.exit(1);
    }
};

export default connectDB;