import { readFileSync } from 'fs';
import { part1, part2 } from '../src/day08';

const dayNumber = __filename.match(/day(\d+)\.test\.ts/)?.[1];
const inputFile: string = `input/day${dayNumber}.txt`;

const example: string = `
30373
25512
65332
33549
35390
`.trim();
const input: string = readFileSync(inputFile, 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example)).toBe(21);
  });
  test(`solution`, () => {
    expect(part1(input)).toBe(1851);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example)).toBe(8);
  });
  test(`solution`, () => {
    expect(part2(input)).toBe(574080);
  });
});
