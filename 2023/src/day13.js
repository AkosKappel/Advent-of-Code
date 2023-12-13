const ASH = '.';
const ROCK = '#';

const parse = (input) => input
  .split('\n\n')
  .map(block => block
    .split('\n')
    .map(line => line.split('')),
  );

const transpose = (matrix) => matrix[0].map((col, i) => matrix.map(row => row[i]));

const compareMirrored = (block, allowedDifferences) => {
  const binary = block.map(row => row.map(c => c === ROCK ? 1 : 0)
    .join(''))
    .map(n => parseInt(n, 2));

  for (let i = 1; i < binary.length; i++) {
    const reflectionSize = Math.min(i, binary.length - i);
    const left = binary.slice(i - reflectionSize, i);
    const right = binary.slice(i, i + reflectionSize).reverse();
    const numDifferences = left
      // get difference between a pair of numbers each representing a row
      .map((n, i) => n ^ right[i])
      // count number of different bits
      .map(n => n.toString(2).split('').filter(c => c === '1').length)
      // get total number of different bits between mirrored halves
      .reduce((a, b) => a + b, 0);

    if (numDifferences === allowedDifferences) return i;
  }
  return 0;
};

const solve = (input, numMismatches = 0) => parse(input)
  .map(block =>
    100 * compareMirrored(block, numMismatches) +
    compareMirrored(transpose(block), numMismatches))
  .reduce((a, b) => a + b, 0);

const part1 = (input) => solve(input);

const part2 = (input) => solve(input, 1);

module.exports = { part1, part2 };
