import { readFileSync } from 'fs';
import { part1, part2 } from '../src/day04';

const dayNumber = __filename.match(/day(\d+)\.test\.ts/)?.[1];
const inputFile: string = `input/day${dayNumber}.txt`;

const example: string = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`.trim();
const input: string = readFileSync(inputFile, 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example)).toBe(2);
  });
  test(`solution`, () => {
    expect(part1(input)).toBe(483);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example)).toBe(4);
  });
  test(`solution`, () => {
    expect(part2(input)).toBe(874);
  });
});
