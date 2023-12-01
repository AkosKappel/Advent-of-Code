const fs = require('fs');
const { part1, part2 } = require('../src/day2');

const example1 = ``;

const input = fs.readFileSync('inputs/input2.txt', 'utf8');

test('part 1 example', () => {
  expect(part1(example1)).toBe(0);
});

test('part 2 example', () => {
  expect(part2(example1)).toBe(0);
});

test('part 1 solution', () => {
  expect(part1(input)).toBe(0);
});

test('part 2 solution', () => {
  expect(part2(input)).toBe(0);
});
