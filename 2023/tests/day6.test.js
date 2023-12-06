const fs = require('fs');
const { part1, part2 } = require('../src/day6');

const example1 = `
Time:      7  15   30
Distance:  9  40  200
`.trim();

const input = fs.readFileSync('inputs/input6.txt', 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example1)).toBe(288);
  });

  test('solution', () => {
    expect(part1(input)).toBe(3317888);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example1)).toBe(71503);
  });

  test('solution', () => {
    expect(part2(input)).toBe(24655068);
  });
});
