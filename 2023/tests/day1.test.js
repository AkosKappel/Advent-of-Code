const fs = require('fs');
const { part1, part2 } = require('../src/day1');

const example1 = ``;
const input = fs.readFileSync('inputs/input1.txt', 'utf8');

test('example part 1', () => {
  expect(part1(example1)).toBe(0);
});

test('example part 2', () => {
  expect(part2(example1)).toBe(0);
});

test('part 1', () => {
  expect(part1(input)).toBe(0);
});

test('part 2', () => {
  expect(part2(input)).toBe(0);
});
