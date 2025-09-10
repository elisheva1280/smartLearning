const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/smartlearning', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ name: 'admin', phone: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      if (!existingAdmin.isAdmin) {
        existingAdmin.isAdmin = true;
        await existingAdmin.save();
        console.log('Updated existing user to admin');
      }
    } else {
      // Create new admin user
      const admin = new User({
        name: 'admin',
        phone: 'admin',
        isAdmin: true
      });
      
      await admin.save();
      console.log('Admin user created successfully');
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating admin:', error);
    mongoose.connection.close();
  }
}

createAdmin();