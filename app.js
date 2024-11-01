import * as diceDefaults from "./js/diceDefaults.js";
import scorecardDefault from "./js/scorecardDefault.js";

// Constants
const defaultMaxRerolls = 3;
const scorecard = scorecardDefault;
const defaultDice = Array(5).fill().map(() => ({ ...diceDefaults.d6Default }));
const bgMusic = new Audio("./bgmusic.mp3")
let dice;
let rerolls;
let roll = [];
let scoreSelected = false;
let maxRerolls = defaultMaxRerolls;
let isMusicPlaying = false;

// DOM elements
const diceContainer = document.getElementById("dice");
const rollsLeft = document.getElementById("rolls-left");
const rollButton = document.getElementById("roll-button");
const newGameButton = document.getElementById("new-game-button");
const nextTurnButton = document.getElementById("next-turn-button");
const rollsLeftValue = document.getElementById("rolls-left-value");
const instructionHold = document.getElementById("instruction-hold");
const instructionStart = document.getElementById("instruction-start");
const instructionScore = document.getElementById("instruction-score");
const upperScorecardTable = document.getElementById("upper-scorecard");
const lowerScorecardTable = document.getElementById("lower-scorecard");
const totalScorecardTable = document.getElementById("total-scorecard");
const instructionNewTurn = document.getElementById("instruction-new-turn");
const instructionGameOver = document.getElementById("instruction-game-over");
const toggleMusicButton = document.getElementById("toggle-music");

const domStates = {
    gameStart: {
        display: [instructionStart, rollButton], 
        hidden: [instructionScore, instructionHold, instructionGameOver, rollsLeft, newGameButton, nextTurnButton, instructionNewTurn]},
    gamePlaying: {
        display: [instructionScore, instructionHold, rollsLeft, rollButton],
        hidden: [instructionStart, instructionGameOver, instructionNewTurn]},
    gameOver: {
        display: [instructionGameOver, newGameButton],
        hidden: [instructionStart, instructionHold, instructionScore, rollsLeft, rollButton, instructionNewTurn]},
    outOfRerolls: {
        display: [instructionScore],
        hidden: [instructionStart, instructionHold, instructionGameOver, rollButton, instructionNewTurn]},
    newTurn: {
        display: [rollButton, instructionNewTurn],
        hidden: [instructionStart, instructionScore, instructionHold, instructionGameOver, rollsLeft, newGameButton]},
}

// Event listeners
rollButton.addEventListener('click', rollDice);
newGameButton.addEventListener('click', init);
nextTurnButton.addEventListener('click', nextTurn);
toggleMusicButton.addEventListener("click", () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        toggleMusicButton.innerText = "Play Music";
    } else {
        bgMusic.play().catch(error => {
            console.log("Autoplay was prevented. User interaction required.");
        });
        toggleMusicButton.innerText = "Pause Music";
    }
    isMusicPlaying = !isMusicPlaying;
});

// Game logic
function rollDice() {
    if (rerolls > 0) {
        scoreSelected = false;
        dice = dice.map(die => die.held ? die : { ...die, value: Math.floor(Math.random() * die.sides) + 1 });
        roll = dice.map(die => (die.value));
        rerolls--;
        renderDice();
        renderScorecard();
    }
}

function nextTurn() {
    const isUpperFilledOut = Object.values(scorecard.upperSection).every(row => row.hasBeenScored);
    const isLowerFilledOut = Object.values(scorecard.lowerSection).every(row => row.hasBeenScored);
    if (isUpperFilledOut && isLowerFilledOut) {
        gameOver();
        return;
    }
    if (scoreSelected) {
        rerolls = maxRerolls;
        scoreSelected = false;
        dice = dice.map(die => ({ ...die, value: null, held: false }));
        changeDomState(domStates.newTurn);
        rollDice();
    }
}

function renderDice() {
    diceContainer.innerHTML = "";
    rollsLeftValue.innerText = rerolls;
    for (const die of dice) {
        const dieDiv = document.createElement("div");
        dieDiv.classList.add("die");
        if (die.held) {
            dieDiv.classList.add("held");
        }
        dieDiv.innerText = die.value;
        if (die.value) {
            dieDiv.classList.add(`die-with-value`);
            dieDiv.addEventListener('click', () => {
                die.held = !die.held;
                dieDiv.classList.toggle("held");
                renderDice();
            });
        } else {
            dieDiv.classList.remove(`die-with-value`);
        }
        diceContainer.appendChild(dieDiv);
    }
    if (rerolls === maxRerolls) {
        changeDomState(domStates.newTurn);
    } else if (rerolls > 0) {
        changeDomState(domStates.gamePlaying);
    } else {
        changeDomState(domStates.outOfRerolls);
    }
}

function calculateScore(row, section) {
    if (scorecard[section][row.id].hasBeenScored) {
        return;
    }
    const score = scorecard[section][row.id].formula(roll);
    const key = row.id;
    setScore(section, key, score);
}

function setScore(section, key, score) {
    if (scorecard[section][key]) {
        scoreSelected = true;
        scorecard[section][key].value = score;
        scorecard[section][key].hasBeenScored = true;
        renderScorecard();
        nextTurn();
    }
}

// Reset scorecard on game start
function resetScorecard() {
    for (const value of Object.values(scorecard.upperSection)) {
        value.value = 0;
        value.hasBeenScored = false;
    }
    for (const value of Object.values(scorecard.lowerSection)) {
        value.value = 0;
        value.hasBeenScored = false;
    }
    scorecard.totalScore.value = 0;
}

// Scorecard rendering
function renderScorecard() {
    renderScorecardSection(upperScorecardTable, "upperSection");
    renderScorecardSection(lowerScorecardTable, "lowerSection");
    renderTotal();
}
function renderScorecardSection(tableName, sectionName) {
    tableName.innerHTML = "";
    for (const value of Object.values(scorecard[sectionName])) {
        const row = document.createElement("tr");
        row.setAttribute('id', value.id);
        if (value.hasBeenScored === true) {
            row.classList.add("scored");
        } else if (!scoreSelected){
            row.addEventListener('click', () => calculateScore(row, sectionName));
        } else{
            row.classList.add("disabled");
        }
        row.innerHTML = `
            <td class="score-name">${value.name}</td>
            <td class="score-value">${value.value}</td>
        `;
        tableName.appendChild(row);
    }
}
function renderTotal() {
    scorecard.calculateTotalScore();
    totalScorecardTable.innerHTML = "";
    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="score-name">${scorecard.totalScore.name}</td>
        <td class="score-value">${scorecard.totalScore.value}</td>
    `;
    totalScorecardTable.appendChild(row);
}

// Game initialization
function init() {
    dice = [...defaultDice];
    rerolls = maxRerolls;
    rollsLeftValue.innerText = rerolls;
    changeDomState(domStates.gameStart);
    resetScorecard();
    renderDice();
    renderScorecard()
}

// Change the state of the DOM elements
function changeDomState(elements) {
    for (const element of elements.display) {
        element.classList.remove("hidden");
    }
    for (const element of elements.hidden) {
        element.classList.add("hidden");
    }
}

// Game over
function gameOver() {
    changeDomState(domStates.gameOver);
}
bgMusic.loop = true;
bgMusic.play().then(() => {
    isMusicPlaying = true;
    toggleMusicButton.innerText = "Pause Music";
}).catch(() => {
    toggleMusicButton.innerText = "Play Music";
    console.log("Autoplay was prevented. User interaction required.");
});
// start the game on page load
document.addEventListener("DOMContentLoaded", init);
