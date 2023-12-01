const fs = require('fs');
const { part1, part2 } = require('../src/day1');

const example1 = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`.trim();

const example2 = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`.trim();

const input = fs.readFileSync('inputs/input1.txt', 'utf8');

test('part 1 example 1', () => {
  expect(part1(example1)).toBe(142);
});

test('part 2 example 2', () => {
  expect(part2(example2)).toBe(281);
});

test('part 1 solution', () => {
  expect(part1(input)).toBe(55123);
});

test('part 2 solution', () => {
  expect(part2(input)).toBe(55260);
});
