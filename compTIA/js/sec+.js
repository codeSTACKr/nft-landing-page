const quizContainer = document.getElementById('quiz-container');

async function loadQuiz(quizId) {
    try {
        const response = await fetchQuestions(quizId);
        if (response.ok) {
            const questions = await response.json();
            displayQuestions(questions);
        } else {
            throw new Error(`Failed to fetch questions: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error loading quiz:', error.message);
    }
}

async function fetchQuestions(quizId) {
    const apiUrl = 'https://alienznbotz.xyz/.netlify/functions/getQuiz'; // Update with the correct URL
    return await fetch(`${apiUrl}/questions?quizId=${quizId}`);
}

function displayQuestions(questions) {
    let quizHtml = '<h2>Quiz Questions</h2>';
    
    questions.forEach(question => {
        quizHtml += `
            <div>
                <p>${question.questionText}</p>
                <ul>
                    <li>${question.option1}</li>
                    <li>${question.option2}</li>
                    <li>${question.option3}</li>
                    <li>${question.option4}</li>
                </ul>
                <p>Correct Option: ${question.correctOption}</p>
                <p>Explanation: ${question.explanation}</p>
            </div>
        `;
    });

    quizContainer.innerHTML = quizHtml;
}
