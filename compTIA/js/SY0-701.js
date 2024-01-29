//SY0-701.js
let quizData = {
    questions: [],
};

let currentQuestionIndex = 0;

function updateQuizData(data) {
    // Update the quizData variable with the fetched data
    quizData = data;
    // Reset the current question index
    currentQuestionIndex = 0;
}

async function loadQuiz(quizId) {
    console.log(`Clicked on Quiz ${quizId}`);
    try {
        // Fetch data from the server endpoint
        const response = await fetch(`https:alienznbotz.xyz/.netlify/functions/getQuiz/${quizId}`);
        const quizData = await response.json();

        // Update the quizData variable with the fetched data
        updateQuizData(quizData);

        // Call loadQuestion to display the first question
        loadQuestion();
    } catch (error) {
        console.error('Error fetching quiz data:', error);
    }
}

function loadQuestion() {
    const questionContainer = document.querySelector('.question');
    const optionsContainer = document.querySelector('.options');

    // Clear previous question and options
    questionContainer.innerHTML = '';
    optionsContainer.innerHTML = '';

    // Load current question
    const currentQuestion = quizData.questions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;

    // Load answer options
    currentQuestion.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.textContent = option;
        optionDiv.setAttribute('onclick', `selectOption(${index})`);
        optionsContainer.appendChild(optionDiv);
    });
}

function loadNextQuestion() {
    // Increment the current question index
    currentQuestionIndex++;

    // Check if there are more questions
    if (currentQuestionIndex < quizData.questions.length) {
        // Load the next question
        loadQuestion();
    } else {
        // Display a message or take appropriate action when the quiz ends
        alert('End of Quiz. Thank you!');
        // You can reset the quiz or navigate to another page
    }
}

// Initial load
// Note: You can load a default quiz or display a message to select a quiz
