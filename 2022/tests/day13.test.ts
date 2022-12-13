import { existsSync, readFileSync } from 'fs';
import { part1, part2 } from '../src/day13';
import * as day from '../examples/day13.input';

const puzzleAnswer1 = 5366;
const puzzleAnswer2 = 23391;

const inputFile: string = `input/day13.in`;
const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';

test(`day 13-1 example`, () => {
  expect(part1(day.input)).toBe(day.answer1);
});

test(`day 13-2 example`, () => {
  expect(part2(day.input)).toBe(day.answer2);
});

test(`day 13-1 puzzle`, () => {
  expect(part1(puzzleInput)).toBe(puzzleAnswer1);
});

test(`day 13-2 puzzle`, () => {
  expect(part2(puzzleInput)).toBe(puzzleAnswer2);
});
