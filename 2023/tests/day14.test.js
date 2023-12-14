const fs = require('fs');
const { part1, part2 } = require('../src/day14');

const example1 = `
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
`.trim();

const input = fs.readFileSync('inputs/input14.txt', 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example1)).toBe(136);
  });

  test('solution', () => {
    expect(part1(input)).toBe(109596);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example1)).toBe(64);
  });

  test('solution', () => {
    expect(part2(input)).toBe(96105);
  });
});
