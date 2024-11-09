
const domElements = {
    buttons: [
        {name: 'rollButton', id: 'roll-button'},
        {name: 'newGameButton', id: 'new-game-button'},
        {name: 'nextTurnButton', id: 'next-turn-button'},
        {name: 'instructionsButton', id: 'instructions-button'},
        {name: 'settingsButton', id: 'settings-button'},
        {name: 'closeInstructionsButton', id: 'close-instructions-modal'},
        {name: 'closeSettingsButton', id: 'close-settings-modal'}
    ],
    modals: [
        {name: 'instructionsModal', id: 'instructions-modal', instructions: [
            {name: 'collapsibleSections', id: 'collapsible-sections'}
        ]},
        {name: 'settingsModal', id: 'settings-modal', settings: [
            {name: 'settingDarkMode', id: 'toggle-dark-mode'},
            {name: 'settingPossiblePoints', id: 'toggle-possible-points'}
        ]}
    ],
    spans: [
        {name: 'rollsDefault', id: 'rolls-default'},
        {name: 'rollsLeft', id: 'rolls-left'},
        {name: 'rollsLeftValue', id: 'rolls-left-value'},
        {name: 'instructionsHold', id: 'instructions-hold'},
        {name: 'instructionsStart', id: 'instructions-start'},
        {name: 'instructionsScore', id: 'instructions-score'},
        {name: 'instructionsGameOver', id: 'instructions-game-over'}
    ],
    scorecard: [
        {name: 'upperScorecardTable', id: 'upper-scorecard'},
        {name: 'lowerScorecardTable', id: 'lower-scorecard'},
        {name: 'totalScorecardTable', id: 'total-scorecard'},
        {name: 'upperSectionBonus', id: 'upper-section-bonus'}
    ],
}

export default domElements;