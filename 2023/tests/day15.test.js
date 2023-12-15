const fs = require('fs');
const { part1, part2 } = require('../src/day15');

const example1 = `
HASH
`.trim();
const example2 = `
rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7
`.trim();

const input = fs.readFileSync('inputs/input15.txt', 'utf8');

describe('part 1', () => {
  test('example 1', () => {
    expect(part1(example1)).toBe(52);
  });

  test('example 2', () => {
    expect(part1(example2)).toBe(1320);
  });

  test('solution', () => {
    expect(part1(input)).toBe(513214);
  });
});

describe('part 2', () => {
  test('example 2', () => {
    expect(part2(example2)).toBe(145);
  });

  test('solution', () => {
    expect(part2(input)).toBe(258826);
  });
});
