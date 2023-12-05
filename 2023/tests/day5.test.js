const fs = require('fs');
const { part1, part2 } = require('../src/day5');

const example1 = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`.trim();

const input = fs.readFileSync('inputs/input5.txt', 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example1)).toBe(35);
  });

  test('solution', () => {
    expect(part1(input)).toBe(910845529);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example1)).toBe(46);
  });

  test('solution', () => {
    expect(part2(input)).toBe(77435348);
  });
});
