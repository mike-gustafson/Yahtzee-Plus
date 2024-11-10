import { rollDice, nextTurn, init, changeDomState } from "../app.js";
import domStates from "./domStates.js";

function createEventListeners() {    
    rollButton.addEventListener('click', () => rollDice());
    newGameButton.addEventListener('click', () => init());
    nextTurnButton.addEventListener('click', () => nextTurn());
    settingsButton.addEventListener('click', () => changeDomState(domStates.openSettings));
    instructionsButton.addEventListener("click", () => changeDomState(domStates.openInstructions));
    window.addEventListener("click", (event) => {if (event.target == instructionsModal) {changeDomState(domStates.closeModal)}});
    window.addEventListener("click", (event) => {if (event.target == settingsModal) {changeDomState(domStates.closeModal)}});
    const collapsibeSections = document.querySelectorAll(".collapsible-section");
    collapsibeSections.forEach(section => {
        const header = section.querySelector("h3");
        const content = section.querySelector(".collapsible-content");
        header.addEventListener("click", () => {
            collapsibeSections.forEach(otherSection => {
                const otherContent = otherSection.querySelector(".collapsible-content");
                if (otherContent !== content) {
                    otherContent.classList.remove("active");
                              otherSection.querySelector(".collapsible-content").classList.remove("active");
    
                }
            });
            content.classList.toggle("active");
            section.classList.toggle("expanded");
        });
    });
}

export default createEventListeners;