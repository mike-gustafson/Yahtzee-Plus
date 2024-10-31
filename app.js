import * as diceDefaults from "./js/diceDefaults.js";
import scorecardDefault from "./js/scorecardDefault.js";

// Constants
const scorecard = scorecardDefault;
const defaultDice = Array(5).fill().map(() => ({ ...diceDefaults.d6Default }));
const defaultMaxRerolls = 3;

let dice;
let rerolls;
let roll = [];
let scoreSelected = false;
let maxRerolls = defaultMaxRerolls;

// DOM elements
const rollButton = document.getElementById("roll-button");
const diceContainer = document.getElementById("dice");
const newGameButton = document.getElementById("new-game-button");
const nextTurnButton = document.getElementById("next-turn-button");
const upperScorecardTable = document.getElementById("upper-scorecard");
const lowerScorecardTable = document.getElementById("lower-scorecard");
const totalScorecardTable = document.getElementById("total-scorecard");

const rollsLeft = document.getElementById("rolls-left");
const rollsLeftValue = document.getElementById("rolls-left-value");
const instructionHold = document.getElementById("instruction-hold");
const instructionStart = document.getElementById("instruction-start");
const instructionScore = document.getElementById("instruction-score");
const instructionGameOver = document.getElementById("instruction-game-over");

const domStates = {
    gameStart: {
        display: [instructionStart, instructionHold, rollButton], 
        hidden: [instructionScore, instructionGameOver, rollsLeft]},
    gamePlaying: {
        display: [instructionScore, instructionHold, rollsLeft, rollButton],
        hidden: [instructionStart, instructionGameOver]},
    gameOver: {
        display: [instructionGameOver, newGameButton],
        hidden: [instructionStart, instructionHold, instructionScore, rollsLeft, rollButton]},
    outOfRerolls: {
        display: [instructionScore],
        hidden: [instructionStart, rollsLeft, rollButton, instructionHold, instructionGameOver]}
}

// Event listeners
rollButton.addEventListener('click', rollDice);
newGameButton.addEventListener('click', init);
nextTurnButton.addEventListener('click', nextTurn);

// Game logic
function rollDice() {
    if (rerolls > 0) {
        dice = dice.map(die => die.held ? die : { ...die, value: Math.floor(Math.random() * die.sides) + 1 });
        roll = dice.map(die => (die.value));
        rerolls--;
        renderDice();
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
        changeDomState(domStates.gamePlaying);
        renderDice();
    } else {
        alert("Please select a score before continuing.");
    }
}

function renderDice() {
    diceContainer.innerHTML = "";
    rollsLeftValue.innerText = rerolls;
    if (rerolls === 0) {
        changeDomState(domStates.outOfRerolls);
    }
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
}

function calculateScore(row, section) {
    if (scorecard[section][row.id].hasBeenScored) {
        alert("There's already a score for this, select another.");
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
        renderScorecard();
        calculateTotalScore();
        nextTurn();
    }
}

function calculateTotalScore() {
    let upperTotal = Object.values(scorecard.upperSection).reduce((sum, item) => sum + item.value, 0);
    let lowerTotal = Object.values(scorecard.lowerSection).reduce((sum, item) => sum + item.value, 0);
    scorecard.totalScore.value = upperTotal + lowerTotal;
    renderTotal();
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
        if (value.hasBeenScored) {
            row.classList.add("scored");
        } else {
            row.addEventListener('click', () => calculateScore(row, sectionName));
        }
        row.innerHTML = `
            <td class="score-name">${value.name}</td>
            <td class="score-value">${value.value}</td>
        `;
        tableName.appendChild(row);
    }
}
function renderTotal() {
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

// Game over
function gameOver() {
    changeDomState(domStates.gameOver);
    alert(`Game over! Your final score is ${scorecard.totalScore.value}`);
}

// Change the state of the DOM elements
function changeDomState(state) {
    for (const element of state.display) {
        element.classList.remove("hidden");
    }
    for (const element of state.hidden) {
        element.classList.add("hidden");
    }
}

// start the game on page load
document.addEventListener("DOMContentLoaded", init());