// =======================================
// RajMauli Math Knowledge Test
// script.js - Part 1
// =======================================

let selectedOperation = "addition";

let totalQuestions = 10;
let currentQuestion = 0;

let correctAnswers = 0;
let wrongAnswers = 0;
let unanswered = 0;

let currentAnswer = 0;

let timerValue = 10;
let timerInterval = null;

// ----------------------------
// Show Home Page
// ----------------------------
function goHome() {

    document.getElementById("homePage").classList.remove("hidden");
    document.getElementById("settingsPage").classList.add("hidden");
    document.getElementById("quizPage").classList.add("hidden");
    document.getElementById("resultPage").classList.add("hidden");

}

// ----------------------------
// Select Quiz Type
// ----------------------------
function selectOperation(operation) {

    selectedOperation = operation;

    document.getElementById("homePage").classList.add("hidden");
    document.getElementById("settingsPage").classList.remove("hidden");

}

// ----------------------------
// Run when page loads
// ----------------------------
window.onload = function () {

    goHome();

};
// =======================================
// RajMauli Math Knowledge Test
// script.js - Part 2
// =======================================

// ----------------------------
// Start Quiz
// ----------------------------
function startQuiz() {

    // Read settings from the page
    totalQuestions = parseInt(
        document.getElementById("questionCount").value,
        10
    );

    timerValue = parseInt(
        document.getElementById("timer").value,
        10
    );

    // Reset counters
    currentQuestion = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    unanswered = 0;

    // Clear previous answer
    document.getElementById("answerInput").value = "";

    // Switch screens
    document.getElementById("settingsPage").classList.add("hidden");
    document.getElementById("quizPage").classList.remove("hidden");
    document.getElementById("resultPage").classList.add("hidden");
    clearInterval(timerInterval);
    // Load the first question
    loadNextQuestion();
}

// =======================================
// RajMauli Math Knowledge Test
// script.js - Part 3
// Generate Addition Questions
// =======================================

// Generate random number based on digit count
function randomNumber(digits) {

    if (digits === 1) {
        return Math.floor(Math.random() * 9) + 1;
    }

    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Replace the old loadNextQuestion() function with this one
function loadNextQuestion() {

    // Quiz completed
    if (currentQuestion >= totalQuestions) {
        showResults();
        return;
    }

    currentQuestion++;

    document.getElementById("progress").textContent =
        "Question " + currentQuestion + " / " + totalQuestions;

    document.getElementById("answerInput").value = "";
    document.getElementById("answerInput").focus();

    const digits =
        parseInt(document.getElementById("digits").value);

    let num1 = randomNumber(digits);
    let num2 = randomNumber(digits);

// Mixed mode chooses a random operation
let operation = selectedOperation;

if (selectedOperation === "mixed") {
    const ops = ["addition", "subtraction", "multiplication", "division"];
    operation = ops[Math.floor(Math.random() * ops.length)];
}

// Addition
if (operation === "addition") {

    currentAnswer = num1 + num2;

    document.getElementById("questionBox").innerHTML =
        `<div style="font-size:70px;font-weight:bold;">
            ${num1} + ${num2} = ?
        </div>`;
}

// Subtraction
else if (operation === "subtraction") {

    if (num2 > num1) {
        [num1, num2] = [num2, num1];
    }

    currentAnswer = num1 - num2;

    document.getElementById("questionBox").innerHTML =
        `<div style="font-size:70px;font-weight:bold;">
            ${num1} − ${num2} = ?
        </div>`;
}

// Multiplication
else if (operation === "multiplication") {

    const tableLimit =
        parseInt(document.getElementById("tableLimit").value, 10);

    num1 = Math.floor(Math.random() * tableLimit) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;

    currentAnswer = num1 * num2;

    document.getElementById("questionBox").innerHTML =
        `<div style="font-size:70px;font-weight:bold;">
            ${num1} × ${num2} = ?
        </div>`;
}

// Division
else if (operation === "division") {

    const divisor = Math.floor(Math.random() * 9) + 1;
    const quotient = Math.floor(Math.random() * 10) + 1;

    num1 = divisor * quotient;
    num2 = divisor;

    currentAnswer = quotient;

    document.getElementById("questionBox").innerHTML =
        `<div style="font-size:70px;font-weight:bold;">
            ${num1} ÷ ${num2} = ?
        </div>`;
}
    document.getElementById("timerDisplay").textContent =
        "⏳ " + timerValue;

}
// =======================================
// Submit Answer
// =======================================

function submitAnswer() {

    const userAnswer =
        parseInt(document.getElementById("answerInput").value);

    if (userAnswer === currentAnswer) {
        correctAnswers++;
    } else {
        wrongAnswers++;
    }

    loadNextQuestion();

}


// =======================================
// Skip Question
// =======================================

function skipQuestion() {

    unanswered++;

    loadNextQuestion();

}


// =======================================
// Show Final Results
// =======================================

function showResults() {

    document.getElementById("quizPage").classList.add("hidden");

    document.getElementById("resultPage").classList.remove("hidden");

    const totalScore =
        Math.round((correctAnswers / totalQuestions) * 100);

    document.getElementById("summary").innerHTML = `
        <h2>🏆 Result Summary</h2>

        <h3>✅ Correct : ${correctAnswers}</h3>

        <h3>❌ Wrong : ${wrongAnswers}</h3>

        <h3>⏭️ Skipped : ${unanswered}</h3>

        <h2>🎯 Score : ${totalScore}%</h2>
    `;

}