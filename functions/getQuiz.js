// functions/getQuiz.js

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { quizId } = event.queryStringParameters;

  console.log('Function started:', new Date().toISOString());
  console.log('Received quizId:', quizId);

  try {
    const response = await fetch(`https://alienznbotz.xyz/.netlify/functions/getQuiz?quizId=${quizId}`);
    
    console.log('Response status:', response.status);

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
  } finally {
    console.log('Function completed:', new Date().toISOString());
  }
};
