//security-plus-701.js

const quizContainer = document.getElementById('quiz-container');
const quizLinks = document.getElementById('quiz-links');

// Function to play click sound when user clicks over chapter selection
function playClickSound() {
    const clickSound = document.getElementById("clickSound");
    clickSound.play();
}

document.addEventListener('DOMContentLoaded', function () {

    // Use a timeout to trigger click event after a short delay
    setTimeout(function () {
        document.getElementById("menu").click();
    }, 100);

    // Add JavaScript to toggle the active class on click
    document.getElementById("menu").addEventListener("click", function () {
        quizLinks.classList.toggle("active");
    });

    // Add event listener for id=quiz1
    document.getElementById("quiz1").addEventListener("click", (event) => {
        // Prevent the default behavior (navigation)
        event.preventDefault();

        // Play the click sound
        playClickSound();

        // Get the href attribute from the clicked link
        const linkHref = event.currentTarget.getAttribute("href");

        // Simulate navigation after the sound has played
        setTimeout(() => {
            window.location.href = linkHref;
        }, 500); // Adjust the delay (in milliseconds) as needed
    });


    // Add event listeners to quiz links
    for (let i = 2; i <= 27; i++) {
        document.getElementById(`quiz${i}`).addEventListener('click', () => {
            playClickSound();
            loadQuiz(i);
            closeMenu();
            toggleQuizOptionsAlignment(false);
        });
    }

    function closeMenu() {
        // Close the menu by removing the active class
        quizLinks.classList.remove("active");
    }

    async function fetchQuestions(quizId) {
        const apiUrl = 'https://alienznbotz.xyz/.netlify/functions/getQuiz';
        try {
            const response = await fetch(`${apiUrl}?quizId=${quizId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch questions: ${response.statusText}`);
            }
            // Parse the JSON response
            const questions = await response.json();
            return questions;
        } catch (error) {
            console.error('Error fetching questions:', error.message);
            throw error;
        }
    }

    async function loadQuiz(quizId) {
        const response = await fetchQuestions(quizId);

        if (response.ok) {
            const questions = await response.json();
            displayQuestions(questions);
            toggleQuizOptionsAlignment(true); // Align quiz options to the left

            // Change the URL without triggering a full page reload
            const quizName = `Quiz-${quizId}`;
            const newUrl = `${window.location.href.split('#')[0]}#${quizName}`;
            history.pushState(null, null, newUrl);
        } else {
            console.error(`Failed to fetch questions: ${response.statusText}`);
        }
    }


    function toggleQuizOptionsAlignment(alignLeft) {
        const quizOptions = quizLinks;
        if (alignLeft) {
            quizOptions.classList.add('quiz-options');
        } else {
            quizOptions.classList.remove('quiz-options');
        }
    }

});

// Move the showAnswer function outside the DOMContentLoaded event listener
function showAnswer(index) {
    const correctOptionElement = document.getElementById(`correct-option-${index}`);
    const explanationElement = document.getElementById(`explanation-${index}`);

    // Toggle the visibility of correct option and explanation
    if (correctOptionElement && explanationElement) {
        correctOptionElement.style.display = (correctOptionElement.style.display === 'none' || !correctOptionElement.style.display) ? 'block' : 'none';
        explanationElement.style.display = (explanationElement.style.display === 'none' || !explanationElement.style.display) ? 'block' : 'none';
    } else {
        console.error('Elements not found for index:', index);
    }
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

// Add a new function for text-to-speech
function readQuestion(questionText) {
    // Use a text-to-speech API or library to read out the question
    // For example, you can use the Web Speech API if supported by the browser
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(questionText);
    synth.speak(utterance);
}

// Modify your existing displayQuestions function to include the sound icon
function displayQuestions(questions) {
    let quizHtml = '';

    questions.forEach((question, index) => {
        const correctOptionText = getOptionText(question.correctOption, question);
        quizHtml += `
        <div class="quiz-container">
        <p><strong>Q${index + 1}: ${question.questionText}</strong>
        <img src="img/sound-icon.png" alt="Sound Icon" class="sound-icon" onclick="readQuestion('${question.questionText}')"></p>
                <ul>
                <li>${question.option1}</li>
                <li>${question.option2}</li>
                <li>${question.option3}</li>
                <li>${question.option4}</li>
            </ul>
            <button class="show-answer-btn" onclick="showAnswer(${index})">Show Answer</button>
            <p class="correct-option" id="correct-option-${index}"><strong>Correct Option:</strong> ${correctOptionText}</p>
            <p class="explanation" id="explanation-${index}"><strong>Explanation:</strong> ${question.explanation}</p>
        </div>
        `;
    });

    // Display the HTML
    document.getElementById('quiz-container').innerHTML = quizHtml;
}