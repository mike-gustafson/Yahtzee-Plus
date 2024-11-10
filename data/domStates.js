const domStates = {
    gameStart: {
        display: ['#instructions-start', '#roll-button', '#rolls-default'],
        hidden: ['#instructions-score', '#instructions-hold', '#instructions-game-over', '#rolls-left', '#next-turn-button']
    },
    gamePlaying: {
        display: ['#instructions-score', '#instructions-hold', '#rolls-left', '#roll-button'],
        hidden: ['#instructions-start', '#instructions-game-over', '#rolls-default']
    },
    gameOver: {
        display: ['#instructions-game-over'],
        hidden: ['#instructions-start', '#instructions-hold', '#instructions-score', '#rolls-left', '#roll-button']
    },
    outOfRerolls: {
        display: ['#instructions-score'],
        hidden: ['#instructions-start', '#instructions-hold', '#instructions-game-over', '#roll-button']
    },
    newTurn: {
        display: ['#roll-button', '#rolls-default'],
        hidden: ['#instructions-start', '#instructions-score', '#instructions-hold', '#instructions-game-over', '#rolls-left']
    },
    openInstructions: {
        display: ['#instructions-modal'],
        hidden: []
    },
    closeModal: {
        display: [],
        hidden: ['#instructions-modal', '#settings-modal']
    },
    openSettings: {
        display: ['#settings-modal'],
        hidden: []
    }
};

export default domStates;