const ASH = '.';
const ROCK = '#';

const parse = (input) => input
  .split('\n\n')
  .map(block => block
    .split('\n')
    .map(line => line.split('')),
  );

const transpose = (matrix) => matrix[0].map((col, i) => matrix.map(row => row[i]));

const arrayEquals = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return false;
  return a.every((val, i) => val === b[i]);
};

const countMirroredRows = (block) => {
  for (let rowIndex = 0; rowIndex < block.length - 1; rowIndex++) {
    if (rowIndex < block.length - 1) {
      const row1 = block[rowIndex];
      const row2 = block[rowIndex + 1];

      if (arrayEquals(row1, row2)) {
        let mirrored = true;
        let i = rowIndex, j = rowIndex + 1;

        while (i >= 0 && j < block.length) {
          const prevRow = block[i];
          const nextRow = block[j];
          if (arrayEquals(prevRow, nextRow)) {
            i--;
            j++;
          } else {
            mirrored = false;
            break;
          }
        }

        if (mirrored) {
          return rowIndex + 1;
        }
      }
    }
  }

  return 0;
};

const countMirrored = (block) => {
  const nRows = countMirroredRows(block);
  const nCols = countMirroredRows(transpose(block));
  return 100 * nRows + nCols;
};

const part1 = (input) => parse(input)
  .map(countMirrored)
  .reduce((a, b) => a + b, 0);

const part2 = (input) => {
  const blocks = parse(input);
  return 0;
};

module.exports = { part1, part2 };

const example1 = `
#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#
`.trim();
console.log(part1(example1));
// console.log(part2(example1));
