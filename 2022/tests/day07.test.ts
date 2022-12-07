import { existsSync, readFileSync } from 'fs';
import { part1, part2 } from '../src/day07';
import { input, answer1, answer2 } from '../examples/day07.input';

const puzzleAnswer1 = 1232307;
const puzzleAnswer2 = 7268994;

const inputFile: string = `input/day07.in`;
const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';

test(`day 07-1 example`, () => {
  expect(part1(input)).toBe(answer1);
});

test(`day 07-2 example`, () => {
  expect(part2(input)).toBe(answer2);
});

test(`day 07-1 puzzle`, () => {
  expect(part1(puzzleInput)).toBe(puzzleAnswer1);
});

test(`day 07-2 puzzle`, () => {
  expect(part2(puzzleInput)).toBe(puzzleAnswer2);
});
