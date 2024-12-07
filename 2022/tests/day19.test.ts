import { readFileSync } from 'fs';
import { part1, part2 } from '../src/day19';

const dayNumber = __filename.match(/day(\d+)\.test\.ts/)?.[1];
const inputFile: string = `input/day${dayNumber}.txt`;

const example: string = `
Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.
`.trim();
const input: string = readFileSync(inputFile, 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example)).toBe(33);
  });
  test(`solution`, () => {
    expect(part1(input)).toBe(1349);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example)).toBe(3472);
  });
  test(`solution`, () => {
    expect(part2(input)).toBe(21840);
  });
});
