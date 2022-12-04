import { existsSync, readFileSync } from 'fs';
import { part1, part2 } from '../src/day05';

const day: string = '05';
const exampleInput = `

`;
const exampleAnswer1 = 0;
const exampleAnswer2 = 0;
const puzzleAnswer1 = 0;
const puzzleAnswer2 = 0;

const inputFile: string = `input/day${day}.in`;
const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';

test(`day ${day}-1 example`, () => {
  expect(part1(exampleInput)).toBe(exampleAnswer1);
});

test(`day ${day}-2 example`, () => {
  expect(part2(exampleInput)).toBe(exampleAnswer2);
});

test(`day ${day}-1 puzzle`, () => {
  expect(part1(puzzleInput)).toBe(puzzleAnswer1);
});

test(`day ${day}-2 puzzle`, () => {
  expect(part2(puzzleInput)).toBe(puzzleAnswer2);
});
