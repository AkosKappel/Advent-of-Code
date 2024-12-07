import { readFileSync } from 'fs';
import { part1, part2 } from '../src/day24';

const dayNumber = __filename.match(/day(\d+)\.test\.ts/)?.[1];
const inputFile: string = `input/day${dayNumber}.txt`;

const example1: string = `
#.#####
#.....#
#>....#
#.....#
#...v.#
#.....#
#####.#
`.trim();
const example2: string = `
#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#
`.trim();
const input: string = readFileSync(inputFile, 'utf8');

describe('part 1', () => {
  test('example 1', () => {
    expect(part1(example1)).toBe(10);
  });
  test('example 2', () => {
    expect(part1(example2)).toBe(18);
  });
  test(`solution`, () => {
    expect(part1(input)).toBe(301);
  });
});

describe('part 2', () => {
  test('example 1', () => {
    expect(part2(example1)).toBe(30);
  });
  test('example 2', () => {
    expect(part2(example2)).toBe(54);
  });
  test(`solution`, () => {
    expect(part2(input)).toBe(859);
  });
});
