import { readFileSync } from 'fs';
import { part1, part2 } from '../src/day01';

const dayNumber = __filename.match(/day(\d+)\.test\.ts/)?.[1];
const inputFile: string = `input/day${dayNumber}.txt`;

const example: string = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`.trim();
const input: string = readFileSync(inputFile, 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example)).toBe(24000);
  });
  test(`solution`, () => {
    expect(part1(input)).toBe(69626);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example)).toBe(45000);
  });
  test(`solution`, () => {
    expect(part2(input)).toBe(206780);
  });
});
