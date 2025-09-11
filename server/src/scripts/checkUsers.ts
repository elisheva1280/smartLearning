import connectDB from '../config/database';
import { User } from '../models';

async function checkUsers() {
    await connectDB();
    
    const users = await User.find({});
    console.log('All users in database:');
    console.log(JSON.stringify(users, null, 2));
    
    process.exit(0);
}

checkUsers().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});