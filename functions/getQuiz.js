// functions/getQuiz.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { quizId } = event.queryStringParameters;

  try {
    console.log('Fetching quiz data for quizId:', quizId);

    const response = await fetch(`https://alienznbotz.xyz/.netlify/functions/getQuiz/${quizId}`);
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
