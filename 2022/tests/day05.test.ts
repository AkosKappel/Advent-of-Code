import { existsSync, readFileSync } from 'fs';
import { part1, part2 } from '../src/day05';
import { input, answer1, answer2 } from '../exampleInput/day05';

const day: string = '05';

const puzzleAnswer1 = 'VJSFHWGFT';
const puzzleAnswer2 = 'LCTQFBVZV';

const inputFile: string = `input/day${day}.in`;
const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';

test(`day ${day}-1 example`, () => {
  expect(part1(input)).toBe(answer1);
});

test(`day ${day}-2 example`, () => {
  expect(part2(input)).toBe(answer2);
});

test(`day ${day}-1 puzzle`, () => {
  expect(part1(puzzleInput)).toBe(puzzleAnswer1);
});

test(`day ${day}-2 puzzle`, () => {
  expect(part2(puzzleInput)).toBe(puzzleAnswer2);
});
