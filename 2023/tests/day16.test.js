const fs = require('fs');
const { part1, part2 } = require('../src/day16');

const example1 = `
.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....
`.trim();

const input = fs.readFileSync('inputs/input16.txt', 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example1)).toBe(46);
  });

  test('solution', () => {
    expect(part1(input)).toBe(7496);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example1)).toBe(51);
  });

  test('solution', () => {
    expect(part2(input)).toBe(7932);
  });
});
