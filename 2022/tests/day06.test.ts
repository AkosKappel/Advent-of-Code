import { existsSync, readFileSync } from 'fs';
import { part1, part2 } from '../src/day06';
import * as day from '../examples/day06.input';

const puzzleAnswer1 = 1655;
const puzzleAnswer2 = 2665;

const inputFile: string = `input/day06.in`;
const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';

test(`day 06-1 example`, () => {
  expect(part1(day.input)).toBe(day.answer1);
});

test(`day 06-1-2 example`, () => {
  expect(part1(day.input2)).toBe(day.answer1_2);
});

test(`day 06-1-3 example`, () => {
  expect(part1(day.input3)).toBe(day.answer1_3);
});

test(`day 06-1-4 example`, () => {
  expect(part1(day.input4)).toBe(day.answer1_4);
});

test(`day 06-1-5 example`, () => {
  expect(part1(day.input5)).toBe(day.answer1_5);
});

test(`day 06-2 example`, () => {
  expect(part2(day.input)).toBe(day.answer2);
});

test(`day 06-2-2 example`, () => {
  expect(part2(day.input2)).toBe(day.answer2_2);
});

test(`day 06-2-3 example`, () => {
  expect(part2(day.input3)).toBe(day.answer2_3);
});

test(`day 06-2-4 example`, () => {
  expect(part2(day.input4)).toBe(day.answer2_4);
});

test(`day 06-2-5 example`, () => {
  expect(part2(day.input5)).toBe(day.answer2_5);
});

test(`day 06-1 puzzle`, () => {
  expect(part1(puzzleInput)).toBe(puzzleAnswer1);
});

test(`day 06-2 puzzle`, () => {
  expect(part2(puzzleInput)).toBe(puzzleAnswer2);
});
