import instructions from "../data/instructions.js";

function buildInstructionsModal() {
  let modalContent = `
    <div class="modal-content">
      <span id="close-instructions-modal" class="close-button">&times;</span>
      <h2>How to Play Yahtzee</h2>
  `;

  for (const section in instructions) {
    modalContent += `
      <div class="collapsible-section">
        <h3>${instructions[section].title} <span class="arrow">></span></h3>
        <div class="collapsible-content">
    `;

    if (Array.isArray(instructions[section].text)) {
      modalContent += "<ul>";
      instructions[section].text.forEach((text) => {
        modalContent += `<li>${text}</li>`;
      });
      modalContent += "</ul>";
    } else {
      modalContent += `<p>${instructions[section].text}</p>`;
    }

    modalContent += `</div></div>`;
  }

  modalContent += `</div>`;
  return modalContent;
}

const instructionsModal = buildInstructionsModal();

export default instructionsModal;