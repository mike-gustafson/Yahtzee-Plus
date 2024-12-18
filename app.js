import settings from "./data/settings.js";
import scorecard from "./data/scorecard.js";
import domStates from "./data/domStates.js";
import * as diceTypes from "./data/dice.js";

import initModals from "./js/initModals.js";
import changeDomState from "./js/changeDomState.js";
import mapDomElements from "./js/mapDomElements.js";
import createEventListeners from "./js/createEventListeners.js";

// constants
const defaultMaxRerolls = 3;
const defaultDice = Array(5).fill().map(() => ({ ...diceTypes.d6 }));

let dice;
let rerolls;
let roll = [];
let maxRerolls = defaultMaxRerolls;
let currentDiceHaveBeenScored = false;

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
    scorecard.upperBonus.value = 0;
    scorecard.totalScore.value = 0;
}

// Scorecard rendering
function scorecardRenderMain() {
    scorecardRenderSection(upperScorecardTable, "upperSection");
    renderUpperSectionBonus();
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
        if (roll.length > 0 && row.classList.contains("possible") && settings.possiblePoints.value) {
        possiblePoints.classList.remove("hidden");
        }
        if (field.possiblePoints.scorePreview(dice) === 0 && !settings.possiblePoints.value) {
        possiblePoints.classList.add("hidden");
        }
    }
    return row;
}
function renderUpperSectionBonus() {
    const bonus = scorecard.upperBonus;
    bonus.value = bonus.formula();
    upperSectionBonus.innerHTML = "";
    const row = document.createElement("tr");
    const pointsNeeded = 63 - Object.values(scorecard.upperSection).reduce((acc, row) => acc + row.value, 0);
    row.innerHTML = `
        <td class="bonus-name">Bonus <span class="points-needed">(need: ${pointsNeeded})</span></td>
        <td class="bonus-value">${bonus.value}</td>
    `;
    const pointNeededElement = row.querySelector(".points-needed");
    if (pointsNeeded <= 0) {
        pointNeededElement.classList.add("hidden");
    } else {
        pointNeededElement.classList.remove("hidden");
    }
    upperSectionBonus.appendChild(row);
}
function renderTotal() {
    scorecard.calculateTotalScore();
    totalScorecardTable.innerHTML = "";
    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="total-name">${scorecard.totalScore.name}</td>
        <td class="total-value">${scorecard.totalScore.value}</td>
    `;
    totalScorecardTable.appendChild(row);
}

// Game initialization
function initGamePlay() {
    dice = [...defaultDice];
    rerolls = maxRerolls;
    rollsLeftValue.innerText = rerolls;
    changeDomState(domStates.gameStart);
    scorecardReset();
    renderDice();
    scorecardRenderMain()
}

// Game over
function gameOver() {
    changeDomState(domStates.gameOver);
}



// start the game on page load
document.addEventListener("DOMContentLoaded", async () => {
    await initModals();
    mapDomElements();
    createEventListeners();
    initGamePlay();
})

export { rollDice, nextTurn, initGamePlay, changeDomState };