import { readFileSync } from 'fs';
import { part1, part2 } from '../src/day06';

const dayNumber = __filename.match(/day(\d+)\.test\.ts/)?.[1];
const inputFile: string = `input/day${dayNumber}.txt`;

const example1: string = `
mjqjpqmgbljsphdztnvjfqwrcgsmlb
`.trim();
const example2: string = `
bvwbjplbgvbhsrlpgdmjqwftvncz
`.trim();
const example3: string = `
nppdvjthqldpwncqszvftbrmjlhg
`.trim();
const example4: string = `
nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg
`.trim();
const example5: string = `
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw
`.trim();
const input: string = readFileSync(inputFile, 'utf8');

describe('part 1', () => {
  test('example 1', () => {
    expect(part1(example1)).toBe(7);
  });
  test('example 2', () => {
    expect(part1(example2)).toBe(5);
  });
  test('example 3', () => {
    expect(part1(example3)).toBe(6);
  });
  test('example 4', () => {
    expect(part1(example4)).toBe(10);
  });
  test('example 5', () => {
    expect(part1(example5)).toBe(11);
  });
  test(`solution`, () => {
    expect(part1(input)).toBe(1655);
  });
});

describe('part 2', () => {
  test('example 1', () => {
    expect(part2(example1)).toBe(19);
  });
  test('example 2', () => {
    expect(part2(example2)).toBe(23);
  });
  test('example 3', () => {
    expect(part2(example3)).toBe(23);
  });
  test('example 4', () => {
    expect(part2(example4)).toBe(29);
  });
  test('example 5', () => {
    expect(part2(example5)).toBe(26);
  });
  test(`solution`, () => {
    expect(part2(input)).toBe(2665);
  });
});
