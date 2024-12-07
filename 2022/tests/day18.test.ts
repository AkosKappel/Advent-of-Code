import { readFileSync } from 'fs';
import { part1, part2 } from '../src/day18';

const dayNumber = __filename.match(/day(\d+)\.test\.ts/)?.[1];
const inputFile: string = `input/day${dayNumber}.txt`;

const example: string = `
2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5
`.trim();
const input: string = readFileSync(inputFile, 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example)).toBe(64);
  });
  test(`solution`, () => {
    expect(part1(input)).toBe(4482);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example)).toBe(58);
  });
  test(`solution`, () => {
    expect(part2(input)).toBe(2576);
  });
});
