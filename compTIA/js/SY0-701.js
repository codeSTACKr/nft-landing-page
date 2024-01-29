// External JS file for client-side code

// Placeholder data for testing
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

// Add other functions as needed (e.g., loadNextQuestion, selectOption)

// Initial load
// Note: You can load a default quiz or display a message to select a quiz
