import { readFileSync } from 'fs';
import { part1, part2 } from '../src/day02';

const dayNumber = __filename.match(/day(\d+)\.test\.ts/)?.[1];
const inputFile: string = `input/day${dayNumber}.txt`;

const example: string = `
A Y
B X
C Z
`.trim();
const input: string = readFileSync(inputFile, 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example)).toBe(15);
  });
  test(`solution`, () => {
    expect(part1(input)).toBe(11873);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example)).toBe(12);
  });
  test(`solution`, () => {
    expect(part2(input)).toBe(12014);
  });
});
