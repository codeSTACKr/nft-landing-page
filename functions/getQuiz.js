// functions/getQuiz.js

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { quizId } = event.queryStringParameters;

  try {
    const response = await fetch(`https:alienznbotz.xyz/.netlify/functions/getQuiz/${quizId}`);
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
