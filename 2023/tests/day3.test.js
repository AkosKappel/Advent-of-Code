const fs = require('fs');
const { part1, part2 } = require('../src/day3');

const example1 = ``.trim();

const input = fs.readFileSync('inputs/input3.txt', 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example1)).toBe(0);
  });

  test('solution', () => {
    expect(part1(input)).toBe(0);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example1)).toBe(0);
  });

  test('solution', () => {
    expect(part2(input)).toBe(0);
  });
});
