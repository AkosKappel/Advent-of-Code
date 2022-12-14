import { existsSync, readFileSync } from 'fs';
import { part1, part2 } from '../src/day14';
import * as day from '../examples/day14.input';

const puzzleAnswer1 = 913;
const puzzleAnswer2 = 30762;

const inputFile: string = `input/day14.in`;
const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';

test(`day 14-1 example`, () => {
  expect(part1(day.input)).toBe(day.answer1);
});

test(`day 14-2 example`, () => {
  expect(part2(day.input)).toBe(day.answer2);
});

test(`day 14-1 puzzle`, () => {
  expect(part1(puzzleInput)).toBe(puzzleAnswer1);
});

test(`day 14-2 puzzle`, () => {
  expect(part2(puzzleInput)).toBe(puzzleAnswer2);
});
