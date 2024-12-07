import { readFileSync } from 'fs';
import { part1, part2 } from '../src/day14';

const dayNumber = __filename.match(/day(\d+)\.test\.ts/)?.[1];
const inputFile: string = `input/day${dayNumber}.txt`;

const example: string = `
498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
`.trim();
const input: string = readFileSync(inputFile, 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example)).toBe(24);
  });
  test(`solution`, () => {
    expect(part1(input)).toBe(913);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example)).toBe(93);
  });
  test(`solution`, () => {
    expect(part2(input)).toBe(30762);
  });
});
