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
            }
        },
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
                for (const [key, count] of Object.entries(counts)) {
                    if (count >= 3) {
                        return dice.reduce((sum, num) => sum + num, 0);
                    }
                }
                return 0;
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
                for (const [key, count] of Object.entries(counts)) {
                    if (count >= 4) {
                        return dice.reduce((sum, num) => sum + num, 0);
                    }
                }
                return 0;
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
                return hasThree && hasTwo ? 25 : 0;
            }
        },
        smallStraight: {
            id: 'smallStraight',
            name: 'Small Straight',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                this.hasBeenScored = true;
                const uniqueDice = [...new Set(dice)];
                const smallStraightPatterns = [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]];
                for (const pattern of smallStraightPatterns) {
                    if (pattern.every(num => uniqueDice.includes(num))) {
                        return 30;
                    }
                }
                return 0;
            }
        },
        largeStraight: {
            id: 'largeStraight',
            name: 'Large Straight',
            value: 0,
            hasBeenScored: false,
            formula: function(dice) {
                this.hasBeenScored = true;
                const uniqueDice = [...new Set(dice)];
                if (uniqueDice.length === 5 && (uniqueDice.includes(1) && uniqueDice.includes(2) && uniqueDice.includes(3) && uniqueDice.includes(4) && uniqueDice.includes(5) || 
                    uniqueDice.includes(2) && uniqueDice.includes(3) && uniqueDice.includes(4) && uniqueDice.includes(5) && uniqueDice.includes(6))) {
                    return 40;
                }
                return 0;
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
                if (Object.values(counts).includes(5)) {
                    return 50;
                }
                return 0;
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
            }
        },
    },
    totalScore: { name: 'Total Score', value: 0 },
    calculateTotalScore: function() {
        this.totalScore.value = Object.values(this.upperSection).reduce((sum, item) => sum + item.value, 0) + Object.values(this.lowerSection).reduce((sum, item) => sum + item.value, 0);
    }
};

export default defaultScorecard;