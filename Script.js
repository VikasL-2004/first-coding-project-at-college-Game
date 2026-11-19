let userScore = 0;
let compScore = 0;
let winStreak = 0;

// Select elements
const choices = document.querySelectorAll(".base");
const note = document.querySelector(".note");
const youBox = document.getElementById("You");
const compBox = document.getElementById("Computer");
const streakBox = document.getElementById("streak");
const resetBtn = document.getElementById("reset-btn");

// Random computer choice
const getCompChoice = () => {
    const options = ["stone", "paper", "sizer"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

// Format IDs into clean names with emojis
const formatName = (move) => {
    if (move === "stone") return "Rock 🪨";
    if (move === "paper") return "Paper 📄";
    if (move === "sizer") return "Scissors ✂️";
    return move;
};

// Trigger subtle pop animation on the status banner
const animateNote = () => {
    note.classList.remove("pop");
    void note.offsetWidth; // Force reflow to restart animation
    note.classList.add("pop");
};

// Draw round
const drawGame = (userChoice) => {
    note.innerText = `Draw! Both picked ${formatName(userChoice)}`;
    note.style.backgroundColor = "rgba(30, 41, 59, 0.85)";
    note.style.borderColor = "#38bdf8";
    animateNote();
};

// Win or Loss round
const showWinner = (userWin, userChoice, compChoice) => {
    const userMove = formatName(userChoice);
    const compMove = formatName(compChoice);

    if (userWin) {
        userScore++;
        winStreak++;
        youBox.innerText = `You: ${userScore}`;
        streakBox.innerText = `Streak: ${winStreak} 🔥`;
        note.innerText = `You Win! ${userMove} beats ${compMove}`;
        note.style.backgroundColor = "rgba(21, 128, 61, 0.9)";
        note.style.borderColor = "#4ade80";
    } else {
        compScore++;
        winStreak = 0;
        compBox.innerText = `Computer: ${compScore}`;
        streakBox.innerText = `Streak: 0 🔥`;
        note.innerText = `You Lose! ${compMove} beats ${userMove}`;
        note.style.backgroundColor = "rgba(185, 28, 28, 0.9)";
        note.style.borderColor = "#f87171";
    }
    animateNote();
};

// Main game round
const playGame = (userChoice) => {
    const compChoice = getCompChoice();

    if (userChoice === compChoice) {
        drawGame(userChoice);
    } else {
        let userWin = true;

        if (userChoice === "stone") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "sizer" ? false : true;
        } else {
            userWin = compChoice === "stone" ? false : true;
        }

        showWinner(userWin, userChoice, compChoice);
    }
};

// Reset everything
const resetGame = () => {
    userScore = 0;
    compScore = 0;
    winStreak = 0;
    youBox.innerText = "You: 0";
    compBox.innerText = "Computer: 0";
    streakBox.innerText = "Streak: 0 🔥";
    note.innerText = "Pick Your Move";
    note.style.backgroundColor = "rgba(15, 23, 42, 0.7)";
    note.style.borderColor = "#38bdf8";
    animateNote();
};

// Mouse click controls
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

// Keyboard shortcut controls (R, P, S)
document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key === "r") playGame("stone");
    if (key === "p") playGame("paper");
    if (key === "s") playGame("sizer");
});

resetBtn.addEventListener("click", resetGame);
