const parse = (input) => input.trim()
  .split('\n')
  .map(line => line.split(' ').map(Number));

const getDifferences = (array) => array.map((value, index) => {
  if (index === 0) return 0;
  return value - array[index - 1];
}).slice(1);

const predictNext = (array) => {
  const differences = getDifferences(array);

  // base case
  if (differences.every(d => d === 0)) {
    return array[array.length - 1] + differences[differences.length - 1];
  }

  // recursive case
  const predicted = predictNext(differences);
  return array[array.length - 1] + predicted;
};

const part1 = (input) => parse(input)
  .map(predictNext)
  .reduce((acc, cur) => acc + cur, 0);

const predictPrevious = (array) => {
  const differences = getDifferences(array);
  if (differences.every(d => d === 0)) return array[0];
  return array[0] - predictPrevious(differences);
};

const part2 = (input) => parse(input)
  .map(predictPrevious)
  .reduce((acc, cur) => acc + cur, 0);

module.exports = { part1, part2 };
