const deck = ['a', 'a', 'b', 'b', 'c', 'c', 'd', 'd', 'e', 'e', 'f', 'f', 'g', 'g', 'h', 'h'];


const shuffledcards = shuffle(deck);

function shuffle(cards) {
    const newOrder = [];
    while (cards.length > 0) {
        let index = Math.floor(Math.random() * cards.length);
        newOrder.push(cards[index]);
        cards.splice(index, 1);
    }
    return newOrder;
}

function renderCardGrid(cards) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    for (const card of cards) {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.setAttribute("style", "background-color: lightblue; width: 100px; height: 100px; margin: 5px; display: inline-block; text-align: center; line-height: 100px;");
        cardDiv.innerText = card;
        cardContainer.appendChild(cardDiv);
    }
}


renderCardGrid(shuffledcards);
