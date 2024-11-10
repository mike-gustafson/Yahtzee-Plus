import instructionsModal from "../modals/instructions-modal.js";
import settingsModal from "../modals/settings-modal.js";

async function initModals() {
    await loadModalContent("instructions-modal", instructionsModal);
    await loadModalContent("settings-modal", settingsModal);
}
async function loadModalContent(modalID, modalHTML) {
    const modal = document.getElementById(modalID);
    modal.innerHTML = modalHTML;
}

export default initModals;