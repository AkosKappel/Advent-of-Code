const words2numbers = {
  zero: 0, one: 1, two: 2, three: 3, four: 4,
  five: 5, six: 6, seven: 7, eight: 8, nine: 9,
};

const parse = (input) => input.trim()
  .split('\n')
  .map(line => line.match(/\d/g)
    .map(n => parseInt(n, 10)));

const findFirstDigit = (str) =>
  /^.*?(\d|one|two|three|four|five|six|seven|eight|nine)/g
    .exec(str)[1];

const findLastDigit = (str) =>
  /^.*(\d|one|two|three|four|five|six|seven|eight|nine)/g
    .exec(str)[1];

const parseWithWords = (input) => input.trim()
  .split('\n')
  .map(line => [findFirstDigit(line), findLastDigit(line)]
    .map(n => words2numbers[n] || parseInt(n, 10)));

const decode = (rows) =>
  rows.reduce((acc, row) => acc + 10 * row[0] + row[row.length - 1], 0);

const part1 = (input) => decode(parse(input));

const part2 = (input) => decode(parseWithWords(input));

module.exports = { part1, part2 };
