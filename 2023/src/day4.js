const parse = (input) => input.trim()
  .split('\n')
  .map(line => line.split('|'))
  .map(([winning, yours]) => ({
    card: Number(winning.match(/Card +(\d+)/)[1]),
    winning: new Set(winning.split(':')[1].match(/\d+/g).map(Number)),
    yours: new Set(yours.match(/\d+/g).map(Number)),
    count: 1,
  }));

const part1 = (input) => parse(input)
  .reduce((acc, { winning, yours }) => {
    const common = [...winning].filter(x => yours.has(x));
    const points = common.length ? Math.pow(2, common.length - 1) : 0;
    return acc + points;
  }, 0);

// 30158 is too high

const part2 = (input) => {
  const cards = parse(input);
  return cards.reduce((acc, card, index) => {
    const numCommon = [...card.winning].filter(x => card.yours.has(x)).length;
    for (let i = 1; i <= numCommon; i++) {
      cards[index + i].count += card.count;
    }
    return acc + card.count;
  }, 0);
};

module.exports = { part1, part2 };
