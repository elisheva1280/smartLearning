// import express from 'express';
// // import mysql from 'mysql2/promise';
// import * as mysql from 'mysql2/promise';


// const app = express();
// const port = 3000;

// async function startServer() {
//     // const db = await mysql.createConnection({
//     //     host: 'localhost',
//     //     user: 'DESKTOP-SSNMLFD',
//     //     // password: 'your_password',
//     //     database: 'SmartLearn'
//     // });
//     const config = {
//         user: 'user1',
//         //   password: 'הסיסמה_שלך', // אם צריך
//         server: 'DESKTOP-SSNMLFD',
//         database: 'SmartLearn',
//         options: {
//             trustServerCertificate: true // נדרש לעיתים בסביבת פיתוח
//         }
//     };

//     app.get('/api/items', async (req, res) => {
//         try {
//             const [rows] = await db.execute('SELECT * FROM categories');
//             res.json(rows);
//         } catch (error) {
//             if (error instanceof Error) {
//                 res.status(500).send(error.message);
//             } else {
//                 res.status(500).send('An unknown error occurred');
//             }
//         }
//     });

//     app.listen(port, () => {
//         console.log(`Server running at http://localhost:${port}`);
//     });
// }

// startServer().catch(err => console.error(err));




import express from 'express';
import sql from 'mssql';

const app = express();
const port = 3000;


const config = {
  server: 'DESKTOP-SSNMLFD',
  database: 'SmartLearn',
  options: {
    trustedConnection: true, // השתמש באימות Windows
    trustServerCertificate: true // נדרש לעיתים בסביבת פיתוח
  }
};


async function startServer() {
  try {
    // התחברות ל-SQL Server
    await sql.connect(config);

    app.get('/api/items', async (req, res) => {
      try {
        const result = await sql.query('SELECT * FROM categories');
        res.json(result.recordset);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).send(error.message);
        } else {
          res.status(500).send('An unknown error occurred');
        }
      }
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:3000`);
    });
  } catch (err) {
    console.error('Failed to connect to SQL Server:', err);
  }
}

startServer().catch(err => console.error(err));


// const express = require("express");
// const sql = require("mssql");

// const app = express();

// // תצורת שרת SQL
// const config = {
//   server: 'DESKTOP-SSNMLFD',
//   database: 'SmartLearn',
//   options: {
//     trustedConnection: true, // השתמש באימות Windows
//     trustServerCertificate: true // נדרש לעיתים בסביבת פיתוח
//     // encrypt: true
//   }
// };

// // התחברות לשרת SQL
// sql.connect(config, err => {
// if (err) {
// throw err;
// }
// console.log("Connection Successful!");
// });

// // הגדרת מסלול לאחזור נתונים משרת SQL
// app.get("/", (request, response) => {
// // Execute a SELECT query
// new sql.Request().query("SELECT * FROM Employee", (err, result) => {
// if (err) {
// console.error("Error executing query:", err);
// } else {
// response.send(result.recordset); // Send query result as response
// console.dir(result.recordset);
// }
// });
// });

// // הפעל את השרת בפורט 3000
// app.listen(3000, () => {
// console.log("Listening on port 3000...");
// });