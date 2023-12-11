const fs = require('fs');
const { part1, part2 } = require('../src/day11');

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

const input = fs.readFileSync('inputs/input11.txt', 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example1)).toBe(374);
  });

  test('solution', () => {
    expect(part1(input)).toBe(9509330);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example1)).toBe(82000210);
  });

  test('solution', () => {
    expect(part2(input)).toBe(635832237682);
  });
});
