import { readFileSync } from 'fs';
import { part1, part2 } from '../src/day09';

const dayNumber = __filename.match(/day(\d+)\.test\.ts/)?.[1];
const inputFile: string = `input/day${dayNumber}.txt`;

const example1: string = `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`.trim();
const example2: string = `
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`.trim();
const input: string = readFileSync(inputFile, 'utf8');

describe('part 1', () => {
  test('example 1', () => {
    expect(part1(example1)).toBe(13);
  });
  test(`solution`, () => {
    expect(part1(input)).toBe(6486);
  });
});

describe('part 2', () => {
  test('example 1', () => {
    expect(part2(example1)).toBe(1);
  });
  test('example 2', () => {
    expect(part2(example2)).toBe(36);
  });
  test(`solution`, () => {
    expect(part2(input)).toBe(2678);
  });
});
