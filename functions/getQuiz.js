// // // FOR LOCAL TESTING
// const fs = require('fs');
// const cors = require('cors');
// const path = require('path');
// const express = require('express');

// require('dotenv').config({ path: '../.env' }); // Adjust the path to reach the .env file

// const app = express();
// const port = process.env.PORT || 5500;

// // Enable CORS for all routes
// app.use(cors());

// MySQL connection pool

// functions/getQuiz.js

const mysql = require('mysql2/promise');

exports.handler = async function (event, context) {
  // Define the MySQL connection pool
  const pool = mysql.createPool({
    host: process.env.PLANETSCALE_HOST,
    user: process.env.PLANETSCALE_USERNAME,
    password: process.env.PLANETSCALE_PASSWORD,
    database: process.env.PLANETSCALE_DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  try {
    const quizId = event.queryStringParameters.quizId;
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM Questions WHERE quizID = ?', [quizId]);
    connection.release();

    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (error) {
    console.error('Error fetching questions:', error.message);

    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};



// // FOR LOCAL TESTING
// Serve HTML file
// app.get('/', (req, res) => {
//   const htmlPath = path.join(__dirname, '../compTIA', 'sec+.html');
//   const html = fs.readFileSync(htmlPath, 'utf8');
//   res.send(html);
// });

// // FOR LOCAL TESTING
// Serve static files (CSS, JS, images, etc.) from the 'compTIA' directory
// app.use(express.static(path.join(__dirname, '../compTIA')));

// // FOR LOCAL TESTING
// Test the database connection
// pool.getConnection()
//   .then(connection => {
//     console.log('Connected to Planetscale database!');
//     connection.release();
//   })
//   .catch(error => {
//     console.error('Error connecting to Planetscale database:', error.message);
//   });

// // FOR LOCAL TESTING
// Endpoint to get questions based on quizId
// app.get('/questions', async (req, res) => {
//   // Add the code to fetch questions from the database here
//   try {
//     const quizId = req.query.quizId;
//     const connection = await pool.getConnection();
//     const [rows] = await connection.query('SELECT * FROM Questions WHERE quizID = ?', [quizId]);
//     connection.release();

//     res.json(rows);
//   } catch (error) {
//     console.error('Error fetching questions:', error.message);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // FOR LOCAL TESTING
// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
