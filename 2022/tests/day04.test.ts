import { existsSync, readFileSync } from 'fs';
import { part1, part2 } from '../src/day04';

const day: string = '04';
const exampleInput = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`;
const exampleAnswer1 = 2;
const exampleAnswer2 = 4;
const puzzleAnswer1 = 483;
const puzzleAnswer2 = 874;

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
