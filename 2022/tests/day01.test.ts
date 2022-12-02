import { existsSync, readFileSync } from 'fs';
import { part1, part2 } from '../src/day01';

const day: string = '01';
const exampleInput = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;
const exampleAnswer1 = 24000;
const exampleAnswer2 = 45000;
const puzzleAnswer1 = 69626;
const puzzleAnswer2 = 206780;

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
