import { existsSync, readFileSync } from 'fs';
import { part1, part2 } from '../src/day06';
import * as inp from '../exampleInput/day06';

const puzzleAnswer1 = 1655;
const puzzleAnswer2 = 2665;

const inputFile: string = `input/day06.in`;
const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';

test(`day 06-1 example`, () => {
  expect(part1(inp.input)).toBe(inp.answer1);
});

test(`day 06-1-2 example`, () => {
  expect(part1(inp.input2)).toBe(inp.answer1_2);
});

test(`day 06-1-3 example`, () => {
  expect(part1(inp.input3)).toBe(inp.answer1_3);
});

test(`day 06-1-4 example`, () => {
  expect(part1(inp.input4)).toBe(inp.answer1_4);
});

test(`day 06-1-5 example`, () => {
  expect(part1(inp.input5)).toBe(inp.answer1_5);
});

test(`day 06-2 example`, () => {
  expect(part2(inp.input)).toBe(inp.answer2);
});

test(`day 06-2-2 example`, () => {
  expect(part2(inp.input2)).toBe(inp.answer2_2);
});

test(`day 06-2-3 example`, () => {
  expect(part2(inp.input3)).toBe(inp.answer2_3);
});

test(`day 06-2-4 example`, () => {
  expect(part2(inp.input4)).toBe(inp.answer2_4);
});

test(`day 06-2-5 example`, () => {
  expect(part2(inp.input5)).toBe(inp.answer2_5);
});

test(`day 06-1 puzzle`, () => {
  expect(part1(puzzleInput)).toBe(puzzleAnswer1);
});

test(`day 06-2 puzzle`, () => {
  expect(part2(puzzleInput)).toBe(puzzleAnswer2);
});
