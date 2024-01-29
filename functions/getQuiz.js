// functions/getQuiz.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { quizId } = event.queryStringParameters;

  try {
    const response = await fetch(`${process.env.PLANET_SCALE_URL}/${quizId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch quiz data. Status: ${response.status}`);
    }

    const quizData = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(quizData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Internal Server Error: ${error.message}` }),
    };
  }
};
