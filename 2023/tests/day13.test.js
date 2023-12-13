const fs = require('fs');
const { part1, part2 } = require('../src/day13');

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

const input = fs.readFileSync('inputs/input13.txt', 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example1)).toBe(405);
  });

  test('solution', () => {
    expect(part1(input)).toBe(34889);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example1)).toBe(400);
  });

  test('solution', () => {
    expect(part2(input)).toBe(34224);
  });
});
