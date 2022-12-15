import { part1, part2 } from '../src/day15';
import * as day from '../examples/day15.input';

test(`day 15-1 example`, () => {
  expect(part1(day.input, day.param1)).toBe(day.answer1);
});

test(`day 15-2 example`, () => {
  expect(part2(day.input)).toBe(day.answer2);
});

test(`day 15-1 puzzle`, () => {
  expect(part1(day.puzzleInput, day.puzzleParam1)).toBe(day.puzzleAnswer1);
});

test(`day 15-2 puzzle`, () => {
  expect(part2(day.puzzleInput)).toBe(day.puzzleAnswer2);
});
