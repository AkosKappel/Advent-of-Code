import { existsSync, readFileSync } from 'fs';
import { part1, part2 } from '../src/day04';
import { input, answer1, answer2 } from '../exampleInput/day04';

const puzzleAnswer1 = 483;
const puzzleAnswer2 = 874;

const inputFile: string = `input/day04.in`;
const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';

test(`day 04-1 example`, () => {
  expect(part1(input)).toBe(answer1);
});

test(`day 04-2 example`, () => {
  expect(part2(input)).toBe(answer2);
});

test(`day 04-1 puzzle`, () => {
  expect(part1(puzzleInput)).toBe(puzzleAnswer1);
});

test(`day 04-2 puzzle`, () => {
  expect(part2(puzzleInput)).toBe(puzzleAnswer2);
});
