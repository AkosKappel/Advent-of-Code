import { readFileSync } from 'fs';
import { part1, part2 } from '../src/day13';

const dayNumber = __filename.match(/day(\d+)\.test\.ts/)?.[1];
const inputFile: string = `input/day${dayNumber}.txt`;

const example: string = `
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
`.trim();
const input: string = readFileSync(inputFile, 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example)).toBe(13);
  });
  test(`solution`, () => {
    expect(part1(input)).toBe(5366);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example)).toBe(140);
  });
  test(`solution`, () => {
    expect(part2(input)).toBe(23391);
  });
});
