import { readFileSync } from 'fs';
import { part1, part2 } from '../src/day25';

const dayNumber = __filename.match(/day(\d+)\.test\.ts/)?.[1];
const inputFile: string = `input/day${dayNumber}.txt`;

const example: string = `
1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122
`.trim();
const input: string = readFileSync(inputFile, 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example)).toBe(4890);
  });
  test(`solution`, () => {
    expect(part1(input)).toBe(29361331235500);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example)).toBe('2=-1=0');
  });
  test(`solution`, () => {
    expect(part2(input)).toBe('2==221=-002=0-02-000');
  });
});
