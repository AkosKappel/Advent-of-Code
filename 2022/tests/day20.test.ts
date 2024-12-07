import { readFileSync } from 'fs';
import { part1, part2 } from '../src/day20';

const dayNumber = __filename.match(/day(\d+)\.test\.ts/)?.[1];
const inputFile: string = `input/day${dayNumber}.txt`;

const example: string = `
1
2
-3
3
-2
0
4
`.trim();
const input: string = readFileSync(inputFile, 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example)).toBe(3);
  });
  test(`solution`, () => {
    expect(part1(input)).toBe(4224);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example)).toBe(1623178306);
  });
  test(`solution`, () => {
    expect(part2(input)).toBe(861907680486);
  });
});
