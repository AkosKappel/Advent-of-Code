const fs = require('fs');
const { part1, part2 } = require('../src/day9');

const example1 = `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`.trim();

const input = fs.readFileSync('inputs/input9.txt', 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example1)).toBe(114);
  });

  test('solution', () => {
    expect(part1(input)).toBe(1904165718);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example1)).toBe(2);
  });

  test('solution', () => {
    expect(part2(input)).toBe(964);
  });
});
