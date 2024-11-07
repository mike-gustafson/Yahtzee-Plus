const defaultScorecard = {
    upperSection: {
        ones: {
            id: 'ones',
            name: 'Ones',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                return dice.filter(num => num.value === 1).length;
            },
            scoreThis: function(dice) {
                this.value = this.formula(dice);
                return this.value;
            },
            possiblePoints: {
                description: 'Sum of all ones rolled',
                scorePreview: function(dice) {
                    const score = defaultScorecard.upperSection.ones.formula(dice);
                    return `(${score})`;
                }
            }
        },
        twos: {
            id: 'twos',
            name: 'Twos',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                return dice.filter(num => num.value === 2).length * 2;
            },
            scoreThis: function(dice) {
                this.value = this.formula(dice);
                return this.value;
            },
            possiblePoints: {
                description: 'Sum of all twos rolled',
                scorePreview: function(dice) {
                    const score = defaultScorecard.upperSection.twos.formula(dice);
                    return `(${score})`;
                }
            }
        },
        threes: {
            id: 'threes',
            name: 'Threes',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                return dice.filter(num => num.value === 3).length * 3;
            },
            scoreThis: function(dice) {
                this.value = this.formula(dice);
                return this.value;
            },
            possiblePoints: {
                description: 'Sum of all threes rolled',
                scorePreview: function(dice) {
                    const score = defaultScorecard.upperSection.threes.formula(dice);
                    return `(${score})`;
                }
            }
        },
        fours: {
            id: 'fours',
            name: 'Fours',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                return dice.filter(num => num.value === 4).length * 4;
            },
            scoreThis: function(dice) {
                this.value = this.formula(dice);
                return this.value;
            },
            possiblePoints: {
                description: 'Sum of all fours rolled',
                scorePreview: function(dice) {
                    const score = defaultScorecard.upperSection.fours.formula(dice);
                    return `(${score})`;
                }
            }
        },
        fives: {
            id: 'fives',
            name: 'Fives',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                return dice.filter(num => num.value === 5).length * 5;
            },
            scoreThis: function(dice) {
                this.value = this.formula(dice);
                return this.value;
            },
            possiblePoints: {
                description: 'Sum of all fives rolled',
                scorePreview: function(dice) {
                    const score = defaultScorecard.upperSection.fives.formula(dice);
                    return `(${score})`;
                }
            }
        },
        sixes: {
            id: 'sixes',
            name: 'Sixes',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                return dice.filter(die => die.value === 6).length * 6;
            },
            scoreThis: function(dice) {
                this.value = this.formula(dice);
                return this.value;
            },
            possiblePoints: {
                description: 'Sum of all sixes rolled',
                scorePreview: function(dice) {
                    const score = defaultScorecard.upperSection.sixes.formula(dice);
                    return `(${score})`;
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
                if (dice[0].value) {
                    const counts = {};
                    for (const die of dice) {
                        counts[die.value] = (counts[die.value] || 0) + 1;
                    }
                    const isThereThreeOfAKind = Object.values(counts).some(count => count >= 3);
                    if (isThereThreeOfAKind) {
                        return dice.reduce((sum, die) => sum + die.value, 0);
                    }
                }
                return 0
            },
            scoreThis: function(dice) {
                this.value = this.formula(dice);
                return this.value;
            },
            possiblePoints: {
                description: 'Sum of all dice if at least three of one number',
                scorePreview: function(dice) {
                    const score = defaultScorecard.lowerSection.threeOfAKind.formula(dice);
                    return `(${score})`;
                }
            }
        },
        fourOfAKind: {
            id: 'fourOfAKind',
            name: 'Four of a Kind',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
               if (dice[0].value) {
                    const counts = {};
                    for (const die of dice) {
                        counts[die.value] = (counts[die.value] || 0) + 1;
                    }
                    const isThereFourOfAKind = Object.values(counts).some(count => count >= 4);
                    if (isThereFourOfAKind) {
                        return dice.reduce((sum, die) => sum + die.value, 0);
                    }
                }
                return 0
            },
            scoreThis: function(dice) {
                this.value = this.formula(dice);
                return this.value;
            },
            possiblePoints: {
                description: 'Sum of all dice if at least four of one number',
                scorePreview: function(dice) {
                    const score = defaultScorecard.lowerSection.fourOfAKind.formula(dice);
                    return `(${score})`;
                }
            }
        },
        fullHouse: {
            id: 'fullHouse',
            name: 'Full House',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                if (dice[0].value) {
                    const counts = {};
                    for (const die of dice) {
                        counts[die.value] = (counts[die.value] || 0) + 1;
                    }
                    const hasThree = Object.values(counts).includes(3);
                    const hasTwo = Object.values(counts).includes(2);
                    return (hasThree && hasTwo) ? 25 : 0;
                }
                return 0;
            },
            scoreThis: function(dice) {
                this.value = this.formula(dice);
                return this.value;
            },
            possiblePoints: {
                description: 'Score 25 points for a full house',
                scorePreview: function(dice) {
                    const score = defaultScorecard.lowerSection.fullHouse.formula(dice);
                    return `(${score})`;
                }
            }
        },
        smallStraight: {
            id: 'smallStraight',
            name: 'Small Straight',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                const diceValues = dice.map(die => die.value);
                const uniqueDice = new Set(diceValues);
                const straights = [
                    [1, 2, 3, 4],
                    [2, 3, 4, 5],
                    [3, 4, 5, 6]
                ];
                return straights.some(straight => straight.every(num => uniqueDice.has(num))) ? 30 : 0;
            },
            scoreThis: function(dice) {
                this.value = this.formula(dice);
                return this.value;
            },
            possiblePoints: {
                description: 'Score 30 points for a small straight',
                scorePreview: function(dice) {
                    const score = defaultScorecard.lowerSection.smallStraight.formula(dice);
                    return `(${score})`;
                }
            }
        },
        largeStraight: {
            id: 'largeStraight',
            name: 'Large Straight',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                const diceValues = dice.map(die => die.value);
                const uniqueDice = new Set(diceValues);
                const straights = [
                    [1, 2, 3, 4, 5],
                    [2, 3, 4, 5, 6]
                ];
                return straights.some(straight => straight.every(num => uniqueDice.has(num))) ? 40 : 0;
            },
            scoreThis: function(dice) {
                this.value = this.formula(dice);
                return this.value;
            },
            possiblePoints: {
                description: 'Score 40 points for a large straight',
                scorePreview: function(dice) {
                    const score = defaultScorecard.lowerSection.largeStraight.formula(dice);
                    return `(${score})`;
                }
            }
        },
        yahtzee: {
            id: 'yahtzee',
            name: 'Yahtzee',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                if (!dice[0].value) {
                    return 0;
                }
                const counts = {};
                for (const die of dice) {
                    counts[die.value] = (counts[die.value] || 0) + 1;
                }
                return Object.values(counts).includes(5) ? 50 : 0;
            },
            scoreThis: function(dice) {
                this.value = this.formula(dice);
                return this.value;
            },
            possiblePoints: {
                description: 'Score 50 points for a Yahtzee',
                scorePreview: function(dice) {
                    const score = defaultScorecard.lowerSection.yahtzee.formula(dice);
                    return `(${score})`;
                }
            }
        },
        chance: {
            id: 'chance',
            name: 'Chance',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                if (dice[0].value) {
                    let totalOfAllDice = 0;
                    for (const die of dice) {
                        totalOfAllDice += die.value;
                    }
                    return totalOfAllDice;   
                }
                return 0;
            },
            scoreThis: function(dice) {
                this.value = this.formula(dice);
                return this.value;
            },
            possiblePoints: {
                description: 'Sum of all dice',
                scorePreview: function(dice) {
                    const score = defaultScorecard.lowerSection.chance.formula(dice);
                    return `(${score})`;
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

