import * as diceDefaults from "./js/diceDefaults.js";
import scorecardDefault from "./js/scorecardDefault.js";

// Constants
const defaultMaxRerolls = 3;
const scorecard = scorecardDefault;
const defaultDice = Array(5).fill().map(() => ({ ...diceDefaults.d6Default }));

const uiOptions = {
    possiblePoints: true,
}

let dice;
let rerolls;
let roll = [];
let maxRerolls = defaultMaxRerolls;
let currentDiceHaveBeenScored = false;

// DOM elements
const diceContainer = document.getElementById("dice");
const rollsLeft = document.getElementById("rolls-left");
const rollButton = document.getElementById("roll-button");
const rollsDefault = document.getElementById("rolls-default");
const closeModalButton = document.getElementById("close-modal");
const newGameButton = document.getElementById("new-game-button");
const nextTurnButton = document.getElementById("next-turn-button");
const rollsLeftValue = document.getElementById("rolls-left-value");
const instructionHold = document.getElementById("instruction-hold");
const instructionStart = document.getElementById("instruction-start");
const instructionScore = document.getElementById("instruction-score");
const upperScorecardTable = document.getElementById("upper-scorecard");
const lowerScorecardTable = document.getElementById("lower-scorecard");
const totalScorecardTable = document.getElementById("total-scorecard");
const instructionsModal = document.getElementById("instructions-modal");
const instructionsButton = document.getElementById("instructions-button");
const instructionGameOver = document.getElementById("instruction-game-over");
const optionPossiblePoints = document.getElementById("toggle-possible-points");
const collapsibeSections = document.querySelectorAll(".collapsible-section");
 
const domStates = {
    gameStart: {
        display: [instructionStart, rollButton, rollsDefault], 
        hidden: [instructionScore, instructionHold, instructionGameOver, rollsLeft, newGameButton, nextTurnButton, rollsLeft]},
    gamePlaying: {
        display: [instructionScore, instructionHold, rollsLeft, rollButton],
        hidden: [instructionStart, instructionGameOver, rollsDefault]},
    gameOver: {
        display: [instructionGameOver, newGameButton],
        hidden: [instructionStart, instructionHold, instructionScore, rollsLeft, rollButton]},
    outOfRerolls: {
        display: [instructionScore],
        hidden: [instructionStart, instructionHold, instructionGameOver, rollButton]},
    newTurn: {
        display: [rollButton, rollsDefault],
        hidden: [instructionStart, instructionScore, instructionHold, instructionGameOver, rollsLeft, newGameButton]},
    openInstructions: {
        display: [instructionsModal],
        hidden: [instructionsButton]},
    closeInstructions: {
        display: [instructionsButton],
        hidden: [instructionsModal]},
}

// Event listeners
rollButton.addEventListener('click', rollDice);
newGameButton.addEventListener('click', init);
nextTurnButton.addEventListener('click', nextTurn);
closeModalButton.addEventListener("click", () => changeDomState(domStates.closeInstructions));
instructionsButton.addEventListener("click", () => changeDomState(domStates.openInstructions));
optionPossiblePoints.addEventListener("click", togglePossiblePoints);
window.addEventListener("click", (event) => {if (event.target == instructionsModal) {changeDomState(domStates.closeInstructions)}});
collapsibeSections.forEach(section => {
    const header = section.querySelector("h3");
    const content = section.querySelector(".collapsible-content");

    header.addEventListener("click", () => {
        collapsibeSections.forEach(otherSection => {
            const otherContent = otherSection.querySelector(".collapsible-content");
            if (otherContent !== content) {
                otherContent.classList.remove("active");
            }
        });
        content.classList.toggle("active");
    });
});
// Game logic
function rollDice() {
    if (rerolls > 0) {
        currentDiceHaveBeenScored = false;
        dice = dice.map(die => die.held ? die : { ...die, value: Math.floor(Math.random() * die.sides) + 1 });
        roll = dice.map(die => (die.value));
        rerolls--;
        renderDice();
        scorecardRenderMain();
    }
}

function nextTurn() {
    const isUpperFilledOut = Object.values(scorecard.upperSection).every(row => row.hasBeenScored);
    const isLowerFilledOut = Object.values(scorecard.lowerSection).every(row => row.hasBeenScored);
    if (isUpperFilledOut && isLowerFilledOut) {
        gameOver();
        return;
    }
    if (currentDiceHaveBeenScored) {
        rerolls = maxRerolls;
        currentDiceHaveBeenScored = false;
        dice = dice.map(die => ({ ...die, value: null, held: false }));
        const possiblePointsElements = document.querySelectorAll(".possiblePoints");
        possiblePointsElements.forEach(element => element.classList.add("hidden"));
        changeDomState(domStates.newTurn);
        renderDice();
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
    const key = row.id;
    if (!dice.every(die => die.value || scorecard[section][row.id].hasBeenScored)) {
        return;
    }
    const score = scorecard[section][key].scoreThis(dice);
    setScore(section, key, score);
}

function setScore(section, key, score) {
    if (scorecard[section][key]) {
        currentDiceHaveBeenScored = true;
        scorecard[section][key].value = score;
        scorecard[section][key].hasBeenScored = true;
        scorecardRenderMain();
        nextTurn();
    }
}

// Reset scorecard on game start
function scorecardReset() {
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
function scorecardRenderMain() {
    scorecardRenderSection(upperScorecardTable, "upperSection");
    scorecardRenderSection(lowerScorecardTable, "lowerSection");
    renderTotal();
}
function scorecardRenderSection(tableName, sectionName) {
    tableName.innerHTML = "";
    for (const field of Object.values(scorecard[sectionName])) {
        let row = scorecardRowCreateElement(field, sectionName);
        row = scorecardRowPossibleScore(sectionName, row);
        row = scorecardRowRender(row, field, dice);
        tableName.appendChild(row);
    }
}
function scorecardRowCreateElement(field, sectionName) {
    const row = document.createElement("tr");
    row.setAttribute('id', field.id);
    if (field.hasBeenScored === true) {
        row.classList.add("scored");
    } else if (!currentDiceHaveBeenScored){
        row.addEventListener('click', () => calculateScore(row, sectionName));
    } else{
        row.classList.add("disabled");
    }
    return row;
}
function scorecardRowPossibleScore(sectionName, row) {
     if (!scorecard[sectionName][row.id].hasBeenScored) {
        const score = scorecard[sectionName][row.id].formula(dice);
        if (score > 0) {
            row.classList.add("possible");
        } else {
            row.classList.remove("possible");
        }
    }
    return row
}
function scorecardRowRender(row, field, dice) {
    if (field.hasBeenScored) {
        row.innerHTML = `
            <td class="score-name">${field.name}</td>
            <td class="score-value">${field.value}</td>`
    } else {
        row.innerHTML = `
            <td class="score-name">${field.name}<span class="possiblePoints hidden"> ${field.possiblePoints.scorePreview(dice)}</span></td>
            <td class="score-value">${field.value}</td>`;    
        const possiblePoints = row.querySelector(".possiblePoints");
        if (roll.length > 0 && row.classList.contains("possible") && uiOptions.possiblePoints) {
            possiblePoints.classList.remove("hidden");
        }
        if (field.possiblePoints.scorePreview(dice) === 0 && !uiOptions.possiblePoints) {
            possiblePoints.classList.add("hidden");
        }
    }
    return row;
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
    scorecardReset();
    renderDice();
    scorecardRenderMain()
}

// Change the state of the DOM elements
function changeDomState(elements) {
    elements.display.forEach(element => {
        if (element) element.classList.remove("hidden");
    });
    elements.hidden.forEach(element => {
        if (element) element.classList.add("hidden");
    });
}

// Options functions
function togglePossiblePoints() {
    uiOptions.possiblePoints = !uiOptions.possiblePoints;
    if (uiOptions.possiblePoints) {
        optionPossiblePoints.classList.add("active");
    } else {
        optionPossiblePoints.classList.remove("active");
    }
    scorecardRenderMain();
}

// Game over
function gameOver() {
    changeDomState(domStates.gameOver);
}

// start the game on page load
document.addEventListener("DOMContentLoaded", init);
