// functions/getQuiz.js

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { quizId } = event.queryStringParameters;

  try {
    // Fetch data from the PlanetScale database or other data source
    // and format it as needed
    const quizData = await fetchDataFromDatabase(quizId);

    return {
      statusCode: 200,
      body: JSON.stringify(quizData),
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

// Function to fetch data from the database (replace this with your actual implementation)
async function fetchDataFromDatabase(quizId) {
  // Implement your database query logic here
  // Return the formatted data
  return { quizId, questions: [...] };
}
