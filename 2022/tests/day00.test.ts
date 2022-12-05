import { existsSync, readFileSync } from 'fs';
import { part1, part2 } from '../src/day06';
import { input, answer1, answer2 } from '../exampleInput/day06';

const puzzleAnswer1 = 0;
const puzzleAnswer2 = 0;

const inputFile: string = `input/day06.in`;
const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';

test(`day 06-1 example`, () => {
  expect(part1(input)).toBe(answer1);
});

test(`day 06-2 example`, () => {
  expect(part2(input)).toBe(answer2);
});

test(`day 06-1 puzzle`, () => {
  expect(part1(puzzleInput)).toBe(puzzleAnswer1);
});

test(`day 06-2 puzzle`, () => {
  expect(part2(puzzleInput)).toBe(puzzleAnswer2);
});
