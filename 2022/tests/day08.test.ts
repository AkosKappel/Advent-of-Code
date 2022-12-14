import { part1, part2 } from '../src/day08';
import * as day from '../examples/day08.input';

test(`day 08-1 example`, () => {
  expect(part1(day.input)).toBe(day.answer1);
});

test(`day 08-2 example`, () => {
  expect(part2(day.input)).toBe(day.answer2);
});

test(`day 08-1 puzzle`, () => {
  expect(part1(day.puzzleInput)).toBe(day.puzzleAnswer1);
});

test(`day 08-2 puzzle`, () => {
  expect(part2(day.puzzleInput)).toBe(day.puzzleAnswer2);
});
