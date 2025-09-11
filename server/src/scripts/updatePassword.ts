import connectDB from '../config/database';
import { User } from '../models';
import bcrypt from 'bcryptjs';

async function updatePassword() {
    await connectDB();
    
    const hashedPassword = await bcrypt.hash('elisheva000', 10);
    
    const result = await User.updateOne(
        { name: 'elisheva', phone: '000' },
        { password: hashedPassword }
    );
    
    console.log('Password updated:', result);
    
    process.exit(0);
}

updatePassword().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});