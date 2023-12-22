const fs = require('fs');
const { part1, part2 } = require('../src/day17');

const example1 = `
2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533
`.trim();
const example2 = `
111111111111
999999999991
999999999991
999999999991
999999999991
`.trim();

const input = fs.readFileSync('inputs/input17.txt', 'utf8');

describe('part 1', () => {
  test('example 1', () => {
    expect(part1(example1)).toBe(102);
  });

  test('solution', () => {
    expect(part1(input)).toBe(870);
  });
});

describe('part 2', () => {
  test('example 1', () => {
    expect(part2(example1)).toBe(94);
  });

  test('example 2', () => {
    expect(part2(example2)).toBe(71);
  });

  test('solution', () => {
    expect(part2(input)).toBe(1063);
  });
});
