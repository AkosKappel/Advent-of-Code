import { existsSync, readFileSync } from 'fs';
import { part1, part2 } from '../src/day11';
import * as day from '../examples/day11.input';

const puzzleAnswer1 = 101436;
const puzzleAnswer2 = 19754471646;

const inputFile: string = `input/day11.in`;
const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';

test(`day 11-1 example`, () => {
  expect(part1(day.input)).toBe(day.answer1);
});

test(`day 11-2 example`, () => {
  expect(part2(day.input)).toBe(day.answer2);
});

test(`day 11-1 puzzle`, () => {
  expect(part1(puzzleInput)).toBe(puzzleAnswer1);
});

test(`day 11-2 puzzle`, () => {
  expect(part2(puzzleInput)).toBe(puzzleAnswer2);
});
