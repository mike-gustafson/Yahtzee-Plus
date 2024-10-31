import * as diceDefaults from "./js/diceDefaults.js";
import scorecardDefault from "./js/scorecardDefault.js";

// Constants
const scorecard = scorecardDefault;
const defaultDice = Array(5).fill().map(() => ({ ...diceDefaults.d6Default }));
const defaultMaxRerolls = 3;

let dice;
let rerolls;
let roll
let scoreSelected = false;
let maxRerolls = defaultMaxRerolls;

// DOM elements
const diceContainer = document.getElementById("dice");
const rollButton = document.getElementById("roll-button");
const newGameButton = document.getElementById("new-game-button");
const nextTurnButton = document.getElementById("next-turn-button");
const upperScorecardTable = document.getElementById("upper-scorecard");
const lowerScorecardTable = document.getElementById("lower-scorecard");
const totalScorecardTable = document.getElementById("total-scorecard");

// Event listeners
rollButton.addEventListener('click', rollDice);
newGameButton.addEventListener('click', init);
nextTurnButton.addEventListener('click', nextTurn);

// Game logic
function nextTurn() {
    if (Object.values(scorecard.upperSection).every(row => row.hasBeenScored) && Object.values(scorecard.lowerSection).every(row => row.hasBeenScored)) {
        newGameButton.classList.remove("hidden");
        rollButton.classList.add("hidden");
        return
    }
    if (scoreSelected) {
        rerolls = maxRerolls;
        dice = dice.map(die => ({ ...die, value: null, held: false }));
        scoreSelected = false;
        nextTurnButton.classList.add("hidden");
        rollButton.classList.remove("hidden");
        renderDice();
    } else {
        alert("Please select a score before continuing.");
    }
}

function rollDice() {
    dice = dice.map(die => die.held ? die : { ...die, value: Math.floor(Math.random() * die.sides) + 1 });
    roll = dice.map(die => (die.value));
    rerolls--;
    console.log(rerolls)
    if (rerolls === 0) {
        nextTurnButton.classList.remove("hidden");
        rollButton.classList.add("hidden");
    }
    renderDice();
}

function renderDice() {
    diceContainer.innerHTML = "";
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
        alert("This row has already been scored.");
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
            <td>${value.name}</td>
            <td>${value.value}</td>
        `;
        tableName.appendChild(row);
    }
}

function renderTotal() {
    totalScorecardTable.innerHTML = "";
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${scorecard.totalScore.name}</td>
        <td>${scorecard.totalScore.value}</td>
    `;
    totalScorecardTable.appendChild(row);
}

// Game initialization
function init() {
    dice = [...defaultDice];
    rerolls = maxRerolls;
    newGameButton.classList.add("hidden");
    rollButton.classList.remove("hidden");
    nextTurnButton.classList.add("hidden");
    resetScorecard();
    renderDice();
    renderScorecard()
}

// start the game on page load

init();