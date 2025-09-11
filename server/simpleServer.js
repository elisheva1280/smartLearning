const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

// Prompt Schema
const promptSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    prompt: String,
    response: String,
    category: String,
    subcategory: String,
    create_at: { type: Date, default: Date.now }
});

const Prompt = mongoose.model('Prompt', promptSchema);

// Routes
app.post('/api/users/login', async (req, res) => {
    try {
        console.log('Login request:', req.body);
        const { username, phone, password } = req.body;
        
        console.log('Looking for user with:', { username, phone });
        const user = await User.findOne({ username, phone });
        
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ error: 'שם משתמש, טלפון או סיסמה שגויים' });
        }
        
        console.log('User found:', { name: user.name, username: user.username, phone: user.phone });
        console.log('Comparing password:', password, 'with stored hash');
        
        const isValidPassword = await bcrypt.compare(password, user.password);
        console.log('Password valid:', isValidPassword);
        
        if (!isValidPassword) {
            console.log('Invalid password');
            return res.status(400).json({ error: 'שם משתמש, טלפון או סיסמה שגויים' });
        }
        
        console.log('Login successful, generating token');
        const token = jwt.sign(
            { id: user._id, name: user.name, username: user.username, phone: user.phone, isAdmin: user.isAdmin },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '24h' }
        );
        
        console.log('Sending response');
        res.json({ 
            token, 
            user: { id: user._id, name: user.name, username: user.username, phone: user.phone, isAdmin: user.isAdmin } 
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'שגיאה בהתחברות' });
    }
});

// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'שגיאה בטעינת משתמשים' });
    }
});

// Get all prompts with user data
app.get('/api/prompts', async (req, res) => {
    try {
        const prompts = await Prompt.find({}).populate('user_id', 'name phone username').sort({ create_at: -1 });
        res.json(prompts);
    } catch (error) {
        console.error('Error fetching prompts:', error);
        res.status(500).json({ error: 'שגיאה בטעינת היסטוריה' });
    }
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Simple server working!' });
});

// Start server
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        app.listen(PORT, () => {
            console.log(`Simple server running on port ${PORT}`);
            console.log('Available routes:');
            console.log('GET /api/test');
            console.log('POST /api/users/login');
            console.log('GET /api/users');
            console.log('GET /api/prompts');
        });
    } catch (error) {
        console.error('Server start error:', error);
    }
};

startServer();