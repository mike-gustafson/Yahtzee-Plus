const instructionsModal = `
<div class="modal-content">
    <span id="close-instructions-modal" class="close-button">&times;</span>
    <h2>How to Play Yahtzee</h2>

    <div class="collapsible-section">
      <h3>Objective <span class="arrow">></span></h3>
      <div class="collapsible-content">
        <p>
          Score the most points by rolling five dice to make specific
          combinations over multiple turns.
        </p>
      </div>
    </div>

    <div class="collapsible-section">
      <h3>Game Rules <span class="arrow">></span></h3>
      <div class="collapsible-content">
        <ul>
          <li>On each turn, you can roll the dice up to three times.</li>
          <li>After each roll, you can click on individual dice to "hold" them.</li>
          <li>Select a scoring category on the scorecard once satisfied with your roll.</li>
          <li>Each category can only be used once per game.</li>
          <li>When both the Upper and Lower scorecard sections are completed, the game ends.</li>
        </ul>
      </div>
    </div>

    <div class="collapsible-section">
      <h3>Scoring <span class="arrow">></span></h3>
      <div class="collapsible-content">
        <p>
          Score points based on specific combinations, divided into Upper and Lower sections:
        </p>
        <ul>
          <li><strong>Upper Section:</strong> Score points based on dice showing numbers 1 to 6.</li>
          <li><strong>Lower Section:</strong> Score points for combinations like Full House, Small Straight, etc.</li>
        </ul>
      </div>
    </div>

    <div class="collapsible-section">
      <h3>How to Play <span class="arrow">></span></h3>
      <div class="collapsible-content">
        <ul>
          <li>Click "Roll" to start your turn.</li>
          <li>Click on dice to hold them for the next roll, or roll again for a better combination.</li>
          <li>Click on a scoring category in the scorecard to save your score and end the turn.</li>
        </ul>
      </div>
    </div>

    <div class="collapsible-section">
      <h3>Controls <span class="arrow">></span></h3>
      <div class="collapsible-content">
        <ul>
          <li><strong>Roll:</strong> Starts a roll or re-roll of the dice.</li>
          <li><strong>Next Turn:</strong> Advances to the next turn after scoring.</li>
          <li><strong>New Game:</strong> Resets the game to start over.</li>
        </ul>
      </div>
    </div>
  </div>
`

export default instructionsModal;