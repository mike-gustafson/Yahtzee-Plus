import settings from "../data/settings.js";

function buildSettingsModal() {
  let modalContent = `
    <div class="modal-content">
      <span id="close-settings-modal" class="close-button">&times;</span>
      <h2>Game settings</h2>
  `;

  for (const setting in settings) {
    const defaultStatus = settings[setting].defaultValue ? "active" : "";

    modalContent += `
      <div class="setting">
        <div class="toggle-container" data-action="${setting}">
          <div class="toggle ${defaultStatus}" id="${settings[setting].toggleId}"></div>
          <span class="toggle-label">${settings[setting].name}</span>
        </div>
        <p class="setting-description">${settings[setting].descriptions}</p>
      </div>
    `;
  }

  modalContent += `</div>`;
  return modalContent;
}

const settingsModal = buildSettingsModal();

export default settingsModal;
