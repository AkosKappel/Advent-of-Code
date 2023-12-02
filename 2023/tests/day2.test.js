const fs = require('fs');
const { part1, part2 } = require('../src/day2');

const example1 = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`.trim();

const input = fs.readFileSync('inputs/input2.txt', 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example1)).toBe(8);
  });

  test('solution', () => {
    expect(part1(input)).toBe(2377);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example1)).toBe(2286);
  });

  test('solution', () => {
    expect(part2(input)).toBe(71220);
  });
});
