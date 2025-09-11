const express = require('express');
const app = express();

app.get('/test', (req, res) => {
    console.log('Test route hit!');
    res.json({ message: 'Simple server working!' });
});

app.listen(3002, () => {
    console.log('Test server running on port 3002');
});