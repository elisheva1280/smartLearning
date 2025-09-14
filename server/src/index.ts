import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './db';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Add logging middleware
app.use((req, res, next) => {
    console.log(`=== ${req.method} ${req.path} ===`);
    console.log('Body:', req.body);
    console.log('Headers:', req.headers);
    next();
});

// Add error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Test route
app.get('/test', (req, res) => {
    console.log('Test route hit!');
    res.json({ message: 'Server is working!' });
});

app.use('/api', routes);

const startServer = async () => {
    // Start server first
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    
    // Connect to DB in background
    connectDB();
};

startServer();

