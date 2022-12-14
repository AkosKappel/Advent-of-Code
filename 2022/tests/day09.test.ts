import { part1, part2 } from '../src/day09';
import * as day from '../examples/day09.input';

test(`day 09-1 example`, () => {
  expect(part1(day.input)).toBe(day.answer1);
});

test(`day 09-2 example`, () => {
  expect(part2(day.input)).toBe(day.answer2);
});

test(`day 09-2-2 example`, () => {
  expect(part2(day.input2)).toBe(day.answer2_2);
});

test(`day 09-1 puzzle`, () => {
  expect(part1(day.puzzleInput)).toBe(day.puzzleAnswer1);
});

test(`day 09-2 puzzle`, () => {
  expect(part2(day.puzzleInput)).toBe(day.puzzleAnswer2);
});
