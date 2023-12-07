const CARDS = {
  A: 12, K: 11, Q: 10, J: 9, T: 8,
  9: 7, 8: 6, 7: 5, 6: 4, 5: 3, 4: 2, 3: 1, 2: 0,
  WILDCARD: -1,
};

const HANDS = {
  FIVE_OF_A_KIND: 6,
  FOUR_OF_A_KIND: 5,
  FULL_HOUSE: 4,
  THREE_OF_A_KIND: 3,
  TWO_PAIR: 2,
  ONE_PAIR: 1,
  NOTHING: 0,
};

class CamelCard {
  constructor(row, wildcard = null) {
    const [hand, bid] = row.split(' ');
    this.hand = hand.split('').map(c => CARDS[c]);
    this.bid = +bid;
    this.numWildcards = this.hand.filter(c => c === wildcard).length;

    // make the wildcard the weakest card
    if (wildcard !== null) {
      this.hand = this.hand.map(c => c === wildcard ? CARDS.WILDCARD : c);
    }

    const cardCounts = this.hand.reduce((counts, card) => {
      counts[card] = (counts[card] || 0) + 1;
      return counts;
    }, {});

    if (wildcard !== null) {
      // find the most common card that is not a wildcard
      const mostCommonCard = Object.keys(cardCounts)
        .map(card => +card)
        .filter(card => card !== CARDS.WILDCARD)
        .reduce((acc, card) => {
          if (cardCounts[card] > (cardCounts[acc] || 0)) return card;
          return acc;
        }, CARDS.A);

      // add the number of wildcards to the most common card
      if (mostCommonCard !== CARDS.WILDCARD) {
        cardCounts[mostCommonCard] = cardCounts[mostCommonCard] || 0;
        cardCounts[mostCommonCard] += this.numWildcards;
        delete cardCounts[CARDS.WILDCARD];
      }
    }

    // invert card counts to get which cards have how many repetitions
    const repetitions = Object.keys(cardCounts).reduce((acc, card) => {
      const count = cardCounts[card];
      acc[count] = (acc[count] || []).concat(card);
      return acc;
    }, {});

    this.strength = HANDS.NOTHING;
    if (repetitions[2] && repetitions[2].length === 1) this.strength = HANDS.ONE_PAIR;
    if (repetitions[2] && repetitions[2].length === 2) this.strength = HANDS.TWO_PAIR;
    if (repetitions[3]) this.strength = HANDS.THREE_OF_A_KIND;
    if (repetitions[3] && repetitions[2]) this.strength = HANDS.FULL_HOUSE;
    if (repetitions[4]) this.strength = HANDS.FOUR_OF_A_KIND;
    if (repetitions[5]) this.strength = HANDS.FIVE_OF_A_KIND;
  }

  // function for comparing two hands
  // returns 1 if this hand is stronger, -1 if other hand is stronger, 0 if equal
  compare(other) {
    // compare strengths
    if (this.strength > other.strength) return 1;
    if (this.strength < other.strength) return -1;

    // compare cards in order they are in hand
    for (let i = 0; i < this.hand.length; i++) {
      if (this.hand[i] > other.hand[i]) {
        return 1;
      } else if (this.hand[i] < other.hand[i]) {
        return -1;
      }
    }

    // hands are equal
    return 0;
  }
}

const solve = (input, wildcard = null) => input.trim()
  .split('\n')
  .map((row) => new CamelCard(row, wildcard))
  .sort((a, b) => a.compare(b))
  .reduce((acc, card, i) => acc + card.bid * (i + 1), 0);

const part1 = (input) => solve(input);

const part2 = (input) => solve(input, CARDS['J']);

module.exports = { part1, part2 };
