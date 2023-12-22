const fs = require('fs');
const { part1, part2 } = require('../src/day18');

const example1 = `
R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)
`.trim();

const input = fs.readFileSync('inputs/input18.txt', 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example1)).toBe(62);
  });

  test('solution', () => {
    expect(part1(input)).toBe(50465);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example1)).toBe(952408144115);
  });

  test('solution', () => {
    expect(part2(input)).toBe(82712746433310);
  });
});
