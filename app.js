import scorecardDefault from "./js/scorecardDefault.js";

const scorecard = scorecardDefault;

const d6Default = {
    sides: 6,
    values: [1, 2, 3, 4, 5, 6],
    held: false,
    value: null
};
let scoreSelected = false;
const defaultMaxRerolls = 3;
const maxRerolls = defaultMaxRerolls;
let rerolls = maxRerolls;
const startingDice = Array(5).fill().map(() => ({ ...d6Default }));
let dice;
let roll = [1,2,3,4,5];
const diceContainer = document.getElementById("dice");

const rollButton = document.getElementById("roll-button");
rollButton.addEventListener('click', () => {rollDice(); renderDice();});

const nextTurnButton = document.getElementById("next-turn-button");
nextTurnButton.addEventListener('click', nextTurn);

const newGameButton = document.getElementById("new-game-button");
newGameButton.addEventListener('click', init);

function nextTurn() {
    if (Object.values(scorecard.upperSection).every(row => row.hasBeenScored) && Object.values(scorecard.lowerSection).every(row => row.hasBeenScored)) {
        alert("Game over!");
        newGameButton.setAttribute("style", "display: block");
        rollButton.setAttribute("style", "display: none");
        return
    }
    if (scoreSelected) {
        rerolls = maxRerolls;
        rollButton.disabled = false;
        dice = [...startingDice];
        scoreSelected = false;
        nextTurnButton.classList.toggle("hidden");
        rollButton.classList.toggle("hidden");
        rollDice();
        renderDice();
    } else {
        alert("Please select a score before continuing.");
    }
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
        dieDiv.addEventListener('click', () => {
            die.held = !die.held;
            dieDiv.classList.toggle("held");
            renderDice();
        });
        diceContainer.appendChild(dieDiv);
    }
}

function rollDice() {
    dice = dice.map(die => die.held ? die : { ...die, value: Math.floor(Math.random() * die.sides) + 1 });
    roll = dice.map(die => (die.value));
    rerolls--;
    if (rerolls === 0) {
        nextTurnButton.classList.toggle("hidden");
        rollButton.classList.toggle("hidden");
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

function renderUpperScorecard() {
    const upperScorecardTable = document.getElementById("upper-scorecard");
    upperScorecardTable.innerHTML = "";
    for (const value of Object.values(scorecard.upperSection)) {
        const row = document.createElement("tr");
        row.addEventListener('click', () => calculateScore(row, "upperSection"));
        row.setAttribute('id', value.id);
        row.innerHTML = `
            <td>${value.name}</td>
            <td>${value.value}</td>
        `;
        upperScorecardTable.appendChild(row);
    }
}

function renderLowerScorecard() {
    const lowerScorecardTable = document.getElementById("lower-scorecard");
    lowerScorecardTable.innerHTML = "";

    for (const value of Object.values(scorecard.lowerSection)) {
        const row = document.createElement("tr");
        row.addEventListener('click', () => calculateScore(row, 'lowerSection'));
        row.setAttribute('id', value.id);
        row.innerHTML = `
            <td>${value.name}</td>
            <td>${value.value}</td>
        `;
        lowerScorecardTable.appendChild(row);
    }
}

function renderTotalScorecard() {
    const totalScorecardTable = document.getElementById("total-scorecard");
    totalScorecardTable.innerHTML = "";

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${scorecard.totalScore.name}</td>
        <td>${scorecard.totalScore.value}</td>
    `;
    totalScorecardTable.appendChild(row);
}

function setScore(section, key, score) {
    if (scorecard[section][key]) {
        scoreSelected = true;
        scorecard[section][key].value = score;
        renderUpperScorecard();
        renderLowerScorecard();
        calculateTotalScore();
        nextTurn();
    } else {
        console.error("Invalid section or key.");
    }
}

function calculateTotalScore() {
    let upperTotal = Object.values(scorecard.upperSection).reduce((sum, item) => sum + item.value, 0);
    let lowerTotal = Object.values(scorecard.lowerSection).reduce((sum, item) => sum + item.value, 0);
    scorecard.totalScore.value = upperTotal + lowerTotal;
    renderTotalScorecard();
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

function init() {
    dice = [...startingDice];
    resetScorecard();
    renderDice();
    renderUpperScorecard();
    renderLowerScorecard();
    renderTotalScorecard();
}

init();

