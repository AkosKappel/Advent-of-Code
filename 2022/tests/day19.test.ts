import { part1, part2 } from '../src/day19';
import * as day from '../examples/day19.input';

test(`day 19-1 example`, () => {
  expect(part1(day.input)).toBe(day.answer1);
});

test(`day 19-2 example`, () => {
  expect(part2(day.input)).toBe(day.answer2);
});

test(`day 19-1 puzzle`, () => {
  expect(part1(day.puzzleInput)).toBe(day.puzzleAnswer1);
});

test(`day 19-2 puzzle`, () => {
  expect(part2(day.puzzleInput)).toBe(day.puzzleAnswer2);
});