import instructionsModal from "../html/instructions-modal.js";
import settingsModal from "../html/settings-modal.js";
import settings from "../data/settings.js";

async function initModals() {
    await loadModalContent("instructions-modal", instructionsModal);
    await loadModalContent("settings-modal", settingsModal);
}
async function loadModalContent(modalID, modalHTML) {
    const modal = document.getElementById(modalID);
    modal.innerHTML = modalHTML;
    for (const setting in settings) {
        const toggle = document.getElementById(settings[setting].toggleId);

        if (toggle && settings[setting].toggleAction) {
            toggle.addEventListener("click", settings[setting].toggleAction);
        }
    }
}

export default initModals;