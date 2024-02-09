//sec+.js

const quizContainer = document.getElementById('quiz-container');
const quizLinks = document.getElementById('quiz-links');

// Add event listeners to quiz links
document.getElementById('quiz1').addEventListener('click', () => loadQuiz(1));
document.getElementById('quiz2').addEventListener('click', () => loadQuiz(2));
document.getElementById('quiz3').addEventListener('click', () => loadQuiz(3));
document.getElementById('quiz4').addEventListener('click', () => loadQuiz(4));
document.getElementById('quiz5').addEventListener('click', () => loadQuiz(5));
document.getElementById('quiz6').addEventListener('click', () => loadQuiz(6));
document.getElementById('quiz7').addEventListener('click', () => loadQuiz(7));
document.getElementById('quiz8').addEventListener('click', () => loadQuiz(8));
document.getElementById('quiz9').addEventListener('click', () => loadQuiz(9));
document.getElementById('quiz10').addEventListener('click', () => loadQuiz(10));
document.getElementById('quiz11').addEventListener('click', () => loadQuiz(11));
document.getElementById('quiz12').addEventListener('click', () => loadQuiz(12));
document.getElementById('quiz13').addEventListener('click', () => loadQuiz(13));

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
    const apiUrl = 'https://alienznbotz.xyz/.netlify/functions/getQuiz';
    return await fetch(`${apiUrl}?quizId=${quizId}`);
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
