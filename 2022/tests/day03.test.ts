import { readFileSync } from 'fs';
import { part1, part2 } from '../src/day03';

const dayNumber = __filename.match(/day(\d+)\.test\.ts/)?.[1];
const inputFile: string = `input/day${dayNumber}.txt`;

const example: string = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`.trim();
const input: string = readFileSync(inputFile, 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example)).toBe(157);
  });
  test(`solution`, () => {
    expect(part1(input)).toBe(8109);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example)).toBe(70);
  });
  test(`solution`, () => {
    expect(part2(input)).toBe(2738);
  });
});
