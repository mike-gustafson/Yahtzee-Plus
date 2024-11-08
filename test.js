const tilesContainer = document.querySelector('.tiles');

let colors = [];
let totalPairs = 6;
let tileCount;
let colorsPicklist = [];
let revealedCount = 0;
let firstTile = null;
let awaitingEndofMove = false;
let attemptsLeft = 10;

const winMessage = document.getElementById('winMessage');
const resetButton = document.getElementById('reset');

const colorAmountForm = document.getElementById('select-color-amount');
colorAmountForm.addEventListener('change', (event) => {
    totalPairs = event.target.value;
    resetGame();
});
resetButton.addEventListener('click', resetGame);

function buildTile(color) {
    const currentTile = document.createElement("div");
    currentTile.classList.add("tile");
    currentTile.setAttribute("data-color", color);
    currentTile.setAttribute("data-revealed", "false");
    currentTile.addEventListener("click", () => { handleTileClick(currentTile, color); });
    return currentTile;
}

function handleTileClick(currentTile, color) {
    if (awaitingEndofMove) return;
    if (firstTile) {
        handleTileReveal(currentTile, color);
        handleCheckColorMatch(currentTile);
    }
    handleTileReveal(currentTile, color);
}

function handleTileReveal(currentTile, color) {
    const isRevealed = currentTile.getAttribute("data-revealed");
    if (awaitingEndofMove || isRevealed === "true" || currentTile === firstTile) {
        return;
    }
    currentTile.style.backgroundColor = color;
    if (!firstTile) {
        firstTile = currentTile;
        return;
    }
}

function handleCheckColorMatch(currentTile) {
    const firstTileColor = firstTile.getAttribute("data-color");
    const secondTileColor = currentTile.getAttribute("data-color");

    if (firstTileColor === secondTileColor) {
        firstTile.setAttribute("data-revealed", "true");
        currentTile.setAttribute("data-revealed", "true");
        revealedCount += 2;
        awaitingEndofMove = false;
        firstTile = null;
        checkWinCondition();
    } else {
        attemptsLeft--;
        checkLoseCondition(currentTile);
        awaitingEndofMove = true;
        setTimeout(() => {
            firstTile.style.backgroundColor = "";
            currentTile.style.backgroundColor = "";
            awaitingEndofMove = false;
            firstTile = null;
        }, 1000);
    }
}

function checkWinCondition() {
    if (revealedCount === tileCount) {
        winMessage.classList.remove('hidden');
    }
}

function checkLoseCondition(currentTile) {
    if (attemptsLeft === 0) {
        removeTileEvents();
        currentTile.style.backgroundColor = "";
        firstTile.style.backgroundColor = "";
        winMessage.classList.remove('hidden');
        winMessage.textContent = "You lost!";
    }
}

function removeTileEvents() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        const clone = tile.cloneNode(true);
        tile.parentNode.replaceChild(clone, tile);
    });
}

function resetGame() {
    winMessage.classList.add('hidden');
    revealedCount = 0;
    firstTile = null;
    awaitingEndofMove = false;
    init();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createColorsArray() {
    colors = [];
    const letters = '0123456789ABCDEF';
    for (let i = 0; i < totalPairs; i++) {
        let color = '#';
        for (let j = 0; j < 6; j++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        colors.push(color);
    }
}

function init() {
    tilesContainer.innerHTML = '';
    createColorsArray();
    colorsPicklist = [...colors, ...colors];
    tileCount = colorsPicklist.length;
    attemptsLeft = 10;
    shuffle(colorsPicklist);
    colorsPicklist.forEach(color => {
        const currentTile = buildTile(color);
        tilesContainer.appendChild(currentTile);
    });
}

init();
