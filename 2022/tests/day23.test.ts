import { readFileSync } from 'fs';
import { part1, part2 } from '../src/day23';

const dayNumber = __filename.match(/day(\d+)\.test\.ts/)?.[1];
const inputFile: string = `input/day${dayNumber}.txt`;

const example: string = `
....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..
`.trim();
const input: string = readFileSync(inputFile, 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example)).toBe(110);
  });
  test(`solution`, () => {
    expect(part1(input)).toBe(3987);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example)).toBe(20);
  });
  test(`solution`, () => {
    expect(part2(input)).toBe(938);
  });
});
