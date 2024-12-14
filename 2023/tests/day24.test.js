const fs = require('fs');
const { part1, part2 } = require('../src/day24');

const example1 = `
19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3
`.trim();

const input = fs.readFileSync('inputs/input24.txt', 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example1)).toBe(2);
  });

  test('solution', () => {
    expect(part1(input)).toBe(14672);
  });
});

describe('part 2', () => {
  test('example', async () => {
    expect(await part2(example1)).toBe(47);
  });

  test('solution', async () => {
    expect(await part2(input)).toBe(646810057104753);
  });
});
