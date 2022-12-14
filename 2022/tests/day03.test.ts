import { part1, part2 } from '../src/day03';
import * as day from '../examples/day03.input';

test(`day 03-1 example`, () => {
  expect(part1(day.input)).toBe(day.answer1);
});

test(`day 03-2 example`, () => {
  expect(part2(day.input)).toBe(day.answer2);
});

test(`day 03-1 puzzle`, () => {
  expect(part1(day.puzzleInput)).toBe(day.puzzleAnswer1);
});

test(`day 03-2 puzzle`, () => {
  expect(part2(day.puzzleInput)).toBe(day.puzzleAnswer2);
});
