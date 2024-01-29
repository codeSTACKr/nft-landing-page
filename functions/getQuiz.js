// functions/getQuiz.js

const fetch = require('node-fetch');
const mysql = require('mysql');

// Define database credentials using Netlify environment variables
const connection = mysql.createConnection({
    host: process.env.PLANETSCALE_HOST,
    user: process.env.PLANETSCALE_USERNAME,
    password: process.env.PLANETSCALE_PASSWORD,
    database: process.env.PLANETSCALE_DATABASE_URL,
});

exports.handler = async (event, context) => {
    const { quizId } = event.queryStringParameters;

    // Attempt to connect to the database
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
        } else {
            console.log('Connected to the database!');
        }
    });

    try {
        const response = await fetch(`https://alienznbotz.xyz/.netlify/functions/getQuiz/${quizId}`);
        const quizData = await response.json();

        // Close the database connection after fetching data
        connection.end();

        return {
            statusCode: 200,
            body: JSON.stringify(quizData),
        };
    } catch (error) {
        console.error('Error fetching quiz data:', error);

        // Close the database connection on error
        connection.end();

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
