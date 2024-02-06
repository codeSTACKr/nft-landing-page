// functions/getQuiz.js

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { quizId } = event.queryStringParameters;

  try {
    const response = await fetch(`https://alienznbotz.xyz/functions/getQuiz/${quizId}`);
    
    if (!response.ok) {
      console.error(`Failed to fetch quiz data. Status: ${response.status}`);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch quiz data' }),
      };
    }

    const quizData = await response.json();

    console.log('Quiz data fetched successfully:', quizData);

    return {
      statusCode: 200,
      body: JSON.stringify(quizData),
    };
  } catch (error) {
    console.error('Error fetching quiz data:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
