import express from 'express';
// import mysql from 'mysql2/promise';
import * as mysql from 'mysql2/promise';


const app = express();
const port = 3000;

async function startServer() {
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'DESKTOP-SSNMLFD',
        // password: 'your_password',
        database: 'SmartLearn'
    });

    app.get('/api/items', async (req, res) => {
        try {
            const [rows] = await db.execute('SELECT * FROM your_table');
            res.json(rows);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send('An unknown error occurred');
            }
        }
    });

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

startServer().catch(err => console.error(err));
