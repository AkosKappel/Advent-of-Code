const fs = require('fs');
const { part1, part2 } = require('../src/day21');

const example1 = `
...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........
`.trim();

const input = fs.readFileSync('inputs/input21.txt', 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example1, 6)).toBe(16);
  });

  test('solution', () => {
    expect(part1(input, 64)).toBe(3816);
  });
});

describe('part 2', () => {
  test('example 1', () => {
    expect(part2(example1, 6)).toBe(16);
  });

  test('example 2', () => {
    expect(part2(example1, 10)).toBe(50);
  });

  test('example 3', () => {
    expect(part2(example1, 50)).toBe(1594);
  });

  test('example 4', () => {
    expect(part2(example1, 100)).toBe(6536);
  });

  // test('example 5', () => {
  //   expect(part2(example1, 500)).toBe(167004);
  // });
  //
  // test('example 6', () => {
  //   expect(part2(example1, 1000)).toBe(668697);
  // });
  //
  // test('example 7', () => {
  //   expect(part2(example1, 5000)).toBe(16733044);
  // });

  test('solution', () => {
    expect(part2(input, 26501365)).toBe(634549784009844);
  });
});
