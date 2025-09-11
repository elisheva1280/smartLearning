import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    console.log('Test route hit!');
    res.json({ message: 'TypeScript server working!' });
});

app.post('/api/users/login', (req, res) => {
    console.log('Login attempt:', req.body);
    res.json({ message: 'Login endpoint working' });
});

app.post('/api/users/register', (req, res) => {
    console.log('Register attempt:', req.body);
    res.json({ message: 'Register endpoint working' });
});

app.listen(PORT, () => {
    console.log(`Simple server running on port ${PORT}`);
});