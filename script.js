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

function speak(text) {

    const utterance = new SpeechSynthesisUtterance(text);

    let voices = window.speechSynthesis.getVoices();

    // Try to pick a female-like voice
    let femaleVoice =
        voices.find(v =>
            v.name.toLowerCase().includes("female") ||
            v.name.toLowerCase().includes("google uk english female") ||
            v.name.toLowerCase().includes("samantha") ||   // iOS
            v.name.toLowerCase().includes("zira") ||       // Windows
            v.lang === "en-IN" ||
            v.lang === "en-US"
        );

    if (femaleVoice) {
        utterance.voice = femaleVoice;
    }

    utterance.rate = 0.9;   // slightly slow for kids learning
    utterance.pitch = 1.2;  // higher pitch = more “female-like”
    utterance.volume = 1;

    speechSynthesis.speak(utterance);
}

let speakText = "";

if (operation === "addition") {
    speakText = `${num1} plus ${num2} equals what?`;
}
else if (operation === "subtraction") {
    speakText = `${num1} minus ${num2} equals what?`;
}
else if (operation === "multiplication") {
    speakText = `${num1} multiplied by ${num2} equals what?`;
}
else if (operation === "division") {
    speakText = `${num1} divided by ${num2} equals what?`;
}


window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
};

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
        `<div style="font-size:clamp(28px, 6vw, 70px);font-weight:bold;">
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
        `<div style="font-size:clamp(28px, 6vw, 70px);font-weight:bold;">
            ${num1} − ${num2} = ?
        </div>`;
}

// Multiplication
else if (operation === "multiplication") {

    const tableLimit =
        parseInt(document.getElementById("tableLimit")?.value, 10) || 10;

    num1 = Math.floor(Math.random() * tableLimit) + 1;
    num2 = Math.floor(Math.random() * tableLimit) + 1;

    currentAnswer = num1 * num2;

    document.getElementById("questionBox").innerHTML =
        `<div style="font-size:clamp(28px, 6vw, 70px);font-weight:bold;">
            ${num1} × ${num2} = ?
        </div>`;
}

// Division
else if (operation === "division") {

    const divisor = Math.floor(Math.random() * 9) + 1;
    const quotient = Math.floor(Math.random() * 12) + 1;

    num1 = divisor * quotient;
    num2 = divisor;

    currentAnswer = quotient;

    document.getElementById("questionBox").innerHTML =
        `<div style="font-size:clamp(28px, 6vw, 70px);font-weight:bold;">
            ${num1} ÷ ${num2} = ?
        </div>`;
}
    document.getElementById("timerDisplay").textContent =
        "⏳ " + timerValue;

    speak(speakText);
	startTimer();

}
// =======================================
// Submit Answer
// =======================================

function submitAnswer() {
    clearInterval(timerInterval);
    const answerText =
        document.getElementById("answerInput").value.trim();

    if (answerText === "") {
        unanswered++;
        loadNextQuestion();
        return;
}

    const userAnswer = parseInt(answerText, 10);

if (userAnswer === currentAnswer) {

    correctAnswers++;

    document.getElementById("questionBox").innerHTML =
        "<span style='color:green;'>🎉 Excellent! 🎉</span>";

} else {

    wrongAnswers++;

document.getElementById("questionBox").innerHTML =
    `
    <div style="font-size:50px;color:red;font-weight:bold;">
        ❌ Wrong!
        <br><br>
        ✅ Correct Answer:
        <br>
        ${currentAnswer}
    </div>
    `;
}

    // Wait 0.8 seconds before loading the next question
    setTimeout(loadNextQuestion, 800);

}


// =======================================
// Skip Question
// =======================================

function skipQuestion() {
    clearInterval(timerInterval);
    unanswered++;
    document.getElementById("answerInput").value = "";
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

let medal = "🥉 Bronze";

if (totalScore >= 90) {
    medal = "🥇 Gold";
} else if (totalScore >= 75) {
    medal = "🥈 Silver";
}

document.getElementById("summary").innerHTML = `
    <h2>${medal} Quiz Completed!</h2>

    <h3>✅ Correct : ${correctAnswers}</h3>

    <h3>❌ Wrong : ${wrongAnswers}</h3>

    <h3>⏰ Unanswered : ${unanswered}</h3>

    <h2>🎯 Score : ${totalScore}%</h2>

    <h2>${medal}</h2>
`;
    let bestScore = localStorage.getItem("bestScore");

    if (bestScore === null || totalScore > parseInt(bestScore, 10)) {
        localStorage.setItem("bestScore", totalScore);
        bestScore = totalScore;
    }

    document.getElementById("summary").innerHTML += `
        <hr>
        <h3>🏅 Best Score: ${bestScore}%</h3>
    `;
    if (totalScore === 100) {
        alert("🎉 Outstanding! Perfect Score! 🎉");
    }
}
// =======================================
// Start Countdown Timer
// =======================================

function startTimer() {

    // Stop any existing timer
    clearInterval(timerInterval);

    let secondsLeft = timerValue;

    document.getElementById("timerDisplay").textContent =
        "⏳ " + secondsLeft;

    timerInterval = setInterval(function () {

        secondsLeft--;

        document.getElementById("timerDisplay").textContent =
            "⏳ " + secondsLeft;

        // Last 5 seconds
        if (secondsLeft <= 5 && secondsLeft > 0) {

            // Temporary beep using browser
            try {
                const audio = new Audio(
                    "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
                );
                audio.play().catch(() => {});
            } catch (e) {
                // Ignore if browser blocks autoplay
            }
        }

        // Time up
        if (secondsLeft <= 0) {

            clearInterval(timerInterval);

            unanswered++;

            loadNextQuestion();
        }

    }, 1000);

}
// =======================================
// Press ENTER to Submit
// =======================================

document.addEventListener("keydown", function (event) {

    const quizVisible =
        !document.getElementById("quizPage").classList.contains("hidden");
    const resultVisible =
        !document.getElementById("resultPage").classList.contains("hidden");
    if (quizVisible && event.key === "Enter") {
        submitAnswer();
    }

});