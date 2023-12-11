const EMPTY = '.';
const GALAXY = '#';

const doubleEmptyRow = row => row.replaceAll(EMPTY, '') === '' ? row + '\n' + row : row;

const transpose = (prev, next) => next.map((item, i) => (prev[i] || []).concat(next[i]));

const expandUniverse = (universe) => universe
  .split('\n')
  // double each row whose cells are all empty
  .map(doubleEmptyRow)
  .join('\n')
  .split('\n')
  // transpose
  .map(str => str.split(''))
  .reduce(transpose, [])
  .map(row => row.join(''))
  // double each column whose cells are all empty
  .map(doubleEmptyRow)
  .join('\n')
  .split('\n')
  // transpose back
  .map(str => str.split(''))
  .reduce(transpose, [])
  .map(row => row.join(''))
  .join('\n');

const part1 = (input) => {
  const expanded = expandUniverse(input);

  // Get all galaxy coordinates
  const galaxies = expanded
    .split('\n')
    .flatMap((row, y) => row
      .split('')
      .map((cell, x) => cell === GALAXY ? [x, y] : null))
    .filter(Boolean);

  // Calculate the distance between all galaxies
  const distances = galaxies
    .map(([x1, y1]) => galaxies
      .map(([x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2)));

  // Take sum of only the upper triangle
  return distances
    .flatMap((row, i) => row.slice(i + 1))
    .reduce((sum, distance) => sum + distance, 0);
};

const part2 = (input) => 0;

module.exports = { part1, part2 };

const example1 = `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`.trim();
console.log(part1(example1));
console.log(part2(example1));
