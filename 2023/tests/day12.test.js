const fs = require('fs');
const { part1, part2 } = require('../src/day12');

const example1 = `
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`.trim();

const input = fs.readFileSync('inputs/input12.txt', 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example1)).toBe(21);
  });

  test('solution', () => {
    expect(part1(input)).toBe(8193);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example1)).toBe(525152);
  });

  test('solution', () => {
    expect(part2(input)).toBe(45322533163795);
  });
});
