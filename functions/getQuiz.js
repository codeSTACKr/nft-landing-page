// YOUR_BASE_DIRECTORY/netlify/functions/sec+.js

const { query } = require('@netlify/functions');

document.getElementById('quizButton').addEventListener('click', async () => {
  try {
    console.log('Fetching quiz...');
    
    const response = await query({
      method: 'GET',
      path: '/.netlify/functions/getQuiz',
    });

    console.log('Quiz fetched successfully:', response);

    // Assuming your response contains the quizId
    const quizId = response.quizId;

    console.log('Quiz ID:', quizId);

    // Do something with the quizId

  } catch (error) {
    console.error('Error loading quiz:', error.message);
  }
});
