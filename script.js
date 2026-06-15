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