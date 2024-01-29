// functions/getQuiz.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { quizId } = event.queryStringParameters;

  try {
    // Fetch quiz data from your database or data source
    // Replace the URL below with the appropriate endpoint
    const response = await fetch(`${process.env.PLANET_SCALE_URL}/${quizId}`);
    const quizData = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(quizData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
