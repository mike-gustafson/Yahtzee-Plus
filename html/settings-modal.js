const settingsModal = `
<div class="modal-content">
    <span id="close-settings-modal" class="close-button">&times;</span>
    <h2>Game settings</h2>
    <div class="setting">
      <div class="toggle-container">
        <div class="toggle active" id="toggle-possible-points"></div>
        <span class="toggle-label">Preview Points</span>
      </div>
      <p>Show possible points for each category on the scorecard.</p>
    </div>
  <div class="setting">
    <div class="toggle-container">
      <div class="toggle active" id="toggle-dark-mode"></div>
      <span class="toggle-label">Dark Mode</span>
    </div>
    <p>Toggles Dark Mode Colors</p>
  </div>
</div>
`;

export default settingsModal;