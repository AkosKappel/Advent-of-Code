import { existsSync, readFileSync } from 'fs';
import { part1, part2 } from '../src/day03';
import { input, answer1, answer2 } from '../examples/day03.input';

const puzzleAnswer1 = 8109;
const puzzleAnswer2 = 2738;

const inputFile: string = `input/day03.in`;
const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';

test(`day 03-1 example`, () => {
  expect(part1(input)).toBe(answer1);
});

test(`day 03-2 example`, () => {
  expect(part2(input)).toBe(answer2);
});

test(`day 03-1 puzzle`, () => {
  expect(part1(puzzleInput)).toBe(puzzleAnswer1);
});

test(`day 03-2 puzzle`, () => {
  expect(part2(puzzleInput)).toBe(puzzleAnswer2);
});
