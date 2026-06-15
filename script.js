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

    // Load the first question
    loadNextQuestion();
}

// ----------------------------
// Placeholder for next question
// (We'll implement this in Part 3)
// ----------------------------
function loadNextQuestion() {

    currentQuestion++;

    document.getElementById("progress").textContent =
        "Question " + currentQuestion + " / " + totalQuestions;

    document.getElementById("questionBox").textContent =
        "Loading Question...";

    document.getElementById("timerDisplay").textContent =
        "⏳ " + timerValue;

    document.getElementById("answerInput").value = "";
    document.getElementById("answerInput").focus();
}