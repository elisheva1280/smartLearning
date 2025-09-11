const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

// Login route for testing
app.post('/api/users/login', (req, res) => {
    console.log('Login request received:', req.body);
    res.json({ message: 'Login endpoint reached', data: req.body });
});

app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
});

console.log('Available routes:');
console.log('GET /api/test');
console.log('POST /api/users/login');