import { existsSync, readFileSync } from 'fs';
import { part1, part2 } from '../src/day05';
import * as day from '../examples/day05.input';

const puzzleAnswer1 = 'VJSFHWGFT';
const puzzleAnswer2 = 'LCTQFBVZV';

const inputFile: string = `input/day05.in`;
const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';

test(`day 05-1 example`, () => {
  expect(part1(day.input)).toBe(day.answer1);
});

test(`day 05-2 example`, () => {
  expect(part2(day.input)).toBe(day.answer2);
});

test(`day 05-1 puzzle`, () => {
  expect(part1(puzzleInput)).toBe(puzzleAnswer1);
});

test(`day 05-2 puzzle`, () => {
  expect(part2(puzzleInput)).toBe(puzzleAnswer2);
});
