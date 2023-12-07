const fs = require('fs');
const { part1, part2 } = require('../src/day7');

const example1 = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`.trim();

const input = fs.readFileSync('inputs/input7.txt', 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example1)).toBe(6440);
  });

  test('solution', () => {
    expect(part1(input)).toBe(253638586);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example1)).toBe(5905);
  });

  test('solution', () => {
    expect(part2(input)).toBe(253253225);
  });
});
