const fs = require('fs');
const { part1, part2 } = require('../src/day20');

const example1 = `
broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a
`.trim();
const example2 = `
broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output
`.trim();

const input = fs.readFileSync('inputs/input20.txt', 'utf8');

describe('part 1', () => {
  test('example 1', () => {
    expect(part1(example1)).toBe(32000000);
  });

  test('example 2', () => {
    expect(part1(example2)).toBe(11687500);
  });

  test('solution', () => {
    expect(part1(input)).toBe(834323022);
  });
});

describe('part 2', () => {
  test('solution', () => {
    expect(part2(input)).toBe(225386464601017);
  });
});
