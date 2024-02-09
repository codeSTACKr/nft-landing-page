// sec+.js

const quizContainer = document.getElementById('quiz-container');
const quizLinks = document.getElementById('quiz-links');

// Add JavaScript to toggle the active class on click
document.getElementById("menu").addEventListener("click", function () {
    document.getElementById("quiz-links").classList.toggle("active");
});

// Add event listeners to quiz links
document.getElementById('quiz1').addEventListener('click', () => {
    loadQuiz(1);
    closeMenu();
    toggleQuizOptionsAlignment(false);
});

document.getElementById('quiz2').addEventListener('click', () => {
    loadQuiz(2);
    closeMenu();
    toggleQuizOptionsAlignment(false);
});

document.getElementById('quiz3').addEventListener('click', () => {
    loadQuiz(3);
    closeMenu();
    toggleQuizOptionsAlignment(false);
});

document.getElementById('quiz4').addEventListener('click', () => {
    loadQuiz(4);
    closeMenu();
    toggleQuizOptionsAlignment(false);
});

document.getElementById('quiz5').addEventListener('click', () => {
    loadQuiz(5);
    closeMenu();
    toggleQuizOptionsAlignment(false);
});

document.getElementById('quiz6').addEventListener('click', () => {
    loadQuiz(6);
    closeMenu();
    toggleQuizOptionsAlignment(false);
});

document.getElementById('quiz7').addEventListener('click', () => {
    loadQuiz(7);
    closeMenu();
    toggleQuizOptionsAlignment(false);
});

document.getElementById('quiz8').addEventListener('click', () => {
    loadQuiz(8);
    closeMenu();
    toggleQuizOptionsAlignment(false);
});

document.getElementById('quiz9').addEventListener('click', () => {
    loadQuiz(9);
    closeMenu();
    toggleQuizOptionsAlignment(false);
});

document.getElementById('quiz10').addEventListener('click', () => {
    loadQuiz(10);
    closeMenu();
    toggleQuizOptionsAlignment(false);
});

document.getElementById('quiz11').addEventListener('click', () => {
    loadQuiz(11);
    closeMenu();
    toggleQuizOptionsAlignment(false);
});

document.getElementById('quiz12').addEventListener('click', () => {
    loadQuiz(12);
    closeMenu();
    toggleQuizOptionsAlignment(false);
});

document.getElementById('quiz13').addEventListener('click', () => {
    loadQuiz(13);
    closeMenu();
    toggleQuizOptionsAlignment(false);
});

function closeMenu() {
    // Close the menu by removing the active class
    document.getElementById("quiz-links").classList.remove("active");
}

async function loadQuiz(quizId) {
    try {
        const response = await fetchQuestions(quizId);
        if (response.ok) {
            const questions = await response.json();
            displayQuestions(questions);
            toggleQuizOptionsAlignment(true); // Align quiz options to the left
        } else {
            throw new Error(`Failed to fetch questions: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error loading quiz:', error.message);
    }
}

function toggleQuizOptionsAlignment(alignLeft) {
    const quizOptions = document.getElementById('quiz-links');
    if (alignLeft) {
        quizOptions.classList.add('quiz-options');
    } else {
        quizOptions.classList.remove('quiz-options');
    }
}

async function fetchQuestions(quizId) {
    const apiUrl = 'https://alienznbotz.xyz/.netlify/functions/getQuiz';
    return await fetch(`${apiUrl}?quizId=${quizId}`);
}

function displayQuestions(questions) {
    let quizHtml = ''; /* Remove the initial heading */

    questions.forEach((question, index) => {
        const correctOptionText = getOptionText(question.correctOption);
        quizHtml += `
            <div class="quiz-container">
                <p>Q${index + 1}: ${question.questionText}</p>
                <ul>
                    <li>${question.option1}</li>
                    <li>${question.option2}</li>
                    <li>${question.option3}</li>
                    <li>${question.option4}</li>
                </ul>
                <p class="correct-option">Correct Option: ${correctOptionText}</p>
                <p class="explanation">Explanation: ${question.explanation}</p>
            </div>
        `;
    });

    quizContainer.innerHTML = quizHtml;
}

function getOptionText(option, question) {
    switch (option) {
        case 1:
            return question.option1;
        case 2:
            return question.option2;
        case 3:
            return question.option3;
        case 4:
            return question.option4;
        default:
            return 'Unknown Option';
    }
}
