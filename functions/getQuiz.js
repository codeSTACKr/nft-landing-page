// functions/getQuiz.js

const mysql = require('mysql');

// Define SSL options
const sslOptions = {
    ssl: {
        mode: 'VERIFY_IDENTITY',
        ca: '', // Replace with the appropriate CA certificate
    },
};

// Define database credentials using Netlify environment variables
const connection = mysql.createConnection({
    host: process.env.PLANETSCALE_HOST,
    user: process.env.PLANETSCALE_USERNAME,
    password: process.env.PLANETSCALE_PASSWORD,
    database: process.env.PLANETSCALE_DATABASE_URL,
    ...sslOptions, // Include SSL options
});

exports.handler = async (event, context) => {
    const { quizId } = event.queryStringParameters;

    try {
        // Connect to the database
        connection.connect();

        // Sample query to fetch quiz questions based on quizId
        const query = `SELECT * FROM questions WHERE quiz_id = ${quizId}`;

        // Run the query
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error fetching quiz questions:', error);
                connection.end();
                return {
                    statusCode: 500,
                    body: JSON.stringify({ error: 'Internal Server Error' }),
                };
            } else {
                // Extract quiz questions from the results
                const questions = results.map(row => ({
                    question: row.question,
                    options: [row.option_a, row.option_b, row.option_c, row.option_d],
                    correctAnswer: row.correct_option,
                }));

                // Close the database connection
                connection.end();

                // Send the quiz data as a JSON response
                return {
                    statusCode: 200,
                    body: JSON.stringify({ quizId, questions }),
                };
            }
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
        connection.end();

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
