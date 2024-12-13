const fs = require('fs');
const { part1, part2 } = require('../src/day23');

const example1 = `
#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#
`.trim();

const input = fs.readFileSync('inputs/input23.txt', 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example1)).toBe(94);
  });

  test('solution', () => {
    expect(part1(input)).toBe(2394);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example1)).toBe(154);
  });

  test('solution', () => {
    expect(part2(input)).toBe(6554);
  });
});