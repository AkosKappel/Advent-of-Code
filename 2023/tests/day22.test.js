const fs = require('fs');
const { part1, part2 } = require('../src/day22');

const example1 = `
1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9
`.trim();

const input = fs.readFileSync('inputs/input22.txt', 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example1)).toBe(5);
  });

  test('solution', () => {
    expect(part1(input)).toBe(441);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example1)).toBe(7);
  });

  test('solution', () => {
    expect(part2(input)).toBe(80778);
  });
});
