const defaultScorecard = {
    upperSection: {
        ones: {
            id: 'ones',
            name: 'Ones',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                this.hasBeenScored = true;
                return dice.filter(num => num === 1).length;
            },
            tooltip: {
                description: 'Sum of all ones rolled',
                scorePreview: function(dice) {
                    const score = defaultScorecard.upperSection.ones.formula(dice);
                    return `Score if selected: ${score}`;
                }
            }
        },
        twos: {
            id: 'twos',
            name: 'Twos',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                this.hasBeenScored = true;
                return dice.filter(num => num === 2).length * 2;
            },
            tooltip: {
                description: 'Sum of all twos rolled',
                scorePreview: function(dice) {
                    const score = defaultScorecard.upperSection.twos.formula(dice);
                    return `Score if selected: ${score}`;
                }
            }
        },
        threes: {
            id: 'threes',
            name: 'Threes',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                this.hasBeenScored = true;
                return dice.filter(num => num === 3).length * 3;
            },
            tooltip: {
                description: 'Sum of all threes rolled',
                scorePreview: function(dice) {
                    const score = defaultScorecard.upperSection.threes.formula(dice);
                    return `Score if selected: ${score}`;
                }
            }
        },
        fours: {
            id: 'fours',
            name: 'Fours',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                this.hasBeenScored = true;
                return dice.filter(num => num === 4).length * 4;
            },
            tooltip: {
                description: 'Sum of all fours rolled',
                scorePreview: function(dice) {
                    const score = defaultScorecard.upperSection.fours.formula(dice);
                    return `Score if selected: ${score}`;
                }
            }
        },
        fives: {
            id: 'fives',
            name: 'Fives',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                this.hasBeenScored = true;
                return dice.filter(num => num === 5).length * 5;
            },
            tooltip: {
                description: 'Sum of all fives rolled',
                scorePreview: function(dice) {
                    const score = defaultScorecard.upperSection.fives.formula(dice);
                    return `Score if selected: ${score}`;
                }
            }
        },
        sixes: {
            id: 'sixes',
            name: 'Sixes',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                this.hasBeenScored = true;
                return dice.filter(num => num === 6).length * 6;
            },
            tooltip: {
                description: 'Sum of all sixes rolled',
                scorePreview: function(dice) {
                    const score = defaultScorecard.upperSection.sixes.formula(dice);
                    return `Score if selected: ${score}`;
                }
            }
        }
    },
    lowerSection: {
        threeOfAKind: {
            id: 'threeOfAKind',
            name: 'Three of a Kind',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                this.hasBeenScored = true;
                const counts = {};
                for (const die of dice) {
                    counts[die] = (counts[die] || 0) + 1;
                }
                for (const count of Object.values(counts)) {
                    if (count >= 3) {
                        return dice.reduce((sum, num) => sum + num, 0);
                    }
                }
                return 0;
            },
            tooltip: {
                description: 'Sum of all dice if at least three of one number',
                scorePreview: function(dice) {
                    const score = defaultScorecard.lowerSection.threeOfAKind.formula(dice);
                    return `Score if selected: ${score}`;
                }
            }
        },
        fourOfAKind: {
            id: 'fourOfAKind',
            name: 'Four of a Kind',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                this.hasBeenScored = true;
                const counts = {};
                for (const die of dice) {
                    counts[die] = (counts[die] || 0) + 1;
                }
                for (const count of Object.values(counts)) {
                    if (count >= 4) {
                        return dice.reduce((sum, num) => sum + num, 0);
                    }
                }
                return 0;
            },
            tooltip: {
                description: 'Sum of all dice if at least four of one number',
                scorePreview: function(dice) {
                    const score = defaultScorecard.lowerSection.fourOfAKind.formula(dice);
                    return `Score if selected: ${score}`;
                }
            }
        },
        fullHouse: {
            id: 'fullHouse',
            name: 'Full House',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                this.hasBeenScored = true;
                const counts = {};
                for (const die of dice) {
                    counts[die] = (counts[die] || 0) + 1;
                }
                const hasThree = Object.values(counts).includes(3);
                const hasTwo = Object.values(counts).includes(2);
                return (hasThree && hasTwo) ? 25 : 0;
            },
            tooltip: {
                description: 'Score 25 points for a full house',
                scorePreview: function(dice) {
                    const score = defaultScorecard.lowerSection.fullHouse.formula(dice);
                    return `Score if selected: ${score}`;
                }
            }
        },
        smallStraight: {
            id: 'smallStraight',
            name: 'Small Straight',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                this.hasBeenScored = true;
                const uniqueDice = new Set(dice);
                const straights = [
                    [1, 2, 3, 4],
                    [2, 3, 4, 5],
                    [3, 4, 5, 6]
                ];
                return straights.some(straight => straight.every(num => uniqueDice.has(num))) ? 30 : 0;
            },
            tooltip: {
                description: 'Score 30 points for a small straight',
                scorePreview: function(dice) {
                    const score = defaultScorecard.lowerSection.smallStraight.formula(dice);
                    return `Score if selected: ${score}`;
                }
            }
        },
        largeStraight: {
            id: 'largeStraight',
            name: 'Large Straight',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                this.hasBeenScored = true;
                const uniqueDice = new Set(dice);
                const straights = [
                    [1, 2, 3, 4, 5],
                    [2, 3, 4, 5, 6]
                ];
                return straights.some(straight => straight.every(num => uniqueDice.has(num))) ? 40 : 0;
            },
            tooltip: {
                description: 'Score 40 points for a large straight',
                scorePreview: function(dice) {
                    const score = defaultScorecard.lowerSection.largeStraight.formula(dice);
                    return `Score if selected: ${score}`;
                }
            }
        },
        yahtzee: {
            id: 'yahtzee',
            name: 'Yahtzee',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                this.hasBeenScored = true;
                const counts = {};
                for (const die of dice) {
                    counts[die] = (counts[die] || 0) + 1;
                }
                return Object.values(counts).includes(5) ? 50 : 0;
            },
            tooltip: {
                description: 'Score 50 points for a Yahtzee',
                scorePreview: function(dice) {
                    const score = defaultScorecard.lowerSection.yahtzee.formula(dice);
                    return `Score if selected: ${score}`;
                }
            }
        },
        chance: {
            id: 'chance',
            name: 'Chance',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                this.hasBeenScored = true;
                return dice.reduce((sum, num) => sum + num, 0);
            },
            tooltip: {
                description: 'Sum of all dice',
                scorePreview: function(dice) {
                    const score = defaultScorecard.lowerSection.chance.formula(dice);
                    return `Score if selected: ${score}`;
                }
            }
        }
    },

    totalScore: { name: 'Total Score', value: 0 },
    calculateTotalScore: function() {
        this.totalScore.value = Object.values(this.upperSection).reduce((sum, item) => sum + item.value, 0) >= 63 ? 35 : 0;
        this.totalScore.value += Object.values(this.upperSection).reduce((sum, item) => sum + item.value, 0);
        this.totalScore.value += Object.values(this.lowerSection).reduce((sum, item) => sum + item.value, 0);
    }
};


export default defaultScorecard;

