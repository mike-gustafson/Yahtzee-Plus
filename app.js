import scorecardDefault from "./js/scorecardDefault.js";

const scorecard = scorecardDefault;

const d6Default = {
    sides: 6,
    values: [1, 2, 3, 4, 5, 6],
    held: false,
    value: null
};

const defaultMaxRerolls = 3;
const maxRerolls = defaultMaxRerolls;
let rerolls = maxRerolls;
const startingDice = Array(5).fill().map(() => ({ ...d6Default }));
let dice = [...startingDice];
let roll = [1,2,3,4,5];
const diceContainer = document.getElementById("dice");

const rollButton = document.getElementById("roll-button");
rollButton.addEventListener('click', () => {rollDice(); renderDice();});

const nextTurnButton = document.getElementById("next-turn-button");
nextTurnButton.addEventListener('click', nextTurn);

function nextTurn() {
    rerolls = maxRerolls;
    rollButton.disabled = false;
    dice = [...startingDice];
    nextTurnButton.classList.add("hidden");
    rollDice();
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
        rollButton.disabled = true;
        nextTurnButton.classList.remove("hidden");
    }
}


function calculateScore(row, section) {
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

renderUpperScorecard();
renderLowerScorecard();
renderTotalScorecard();

