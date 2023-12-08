const fs = require('fs');
const { part1, part2 } = require('../src/day8');

const example1 = `
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`.trim();

const example2 = `
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`.trim();

const example3 = `
LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`.trim();

const input = fs.readFileSync('inputs/input8.txt', 'utf8');

describe('part 1', () => {
  test('example 1', () => {
    expect(part1(example1)).toBe(2);
  });

  test('example 2', () => {
    expect(part1(example2)).toBe(6);
  });

  test('solution', () => {
    expect(part1(input)).toBe(13301);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example3)).toBe(6);
  });

  test('solution', () => {
    expect(part2(input)).toBe(7309459565207);
  });
});
