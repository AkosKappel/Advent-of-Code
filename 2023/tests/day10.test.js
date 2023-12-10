const fs = require('fs');
const { part1, part2 } = require('../src/day10');

const example1 = `
.....
.S-7.
.|.|.
.L-J.
.....`.trim();
const example2 = `
-L|F7
7S-7|
L|7||
-L-J|
L|-JF
`.trim();
const example3 = `
..F7.
.FJ|.
SJ.L7
|F--J
LJ...
`.trim();
const example4 = `
7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ
`.trim();
const example5 = `
...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........
`.trim();
const example6 = `
.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...
`.trim();
const example7 = `
FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L
`.trim();

const input = fs.readFileSync('inputs/input10.txt', 'utf8');

describe('part 1', () => {
  test('example 1', () => {
    expect(part1(example1)).toBe(4);
  });

  test('example 2', () => {
    expect(part1(example2)).toBe(4);
  });

  test('example 3', () => {
    expect(part1(example3)).toBe(8);
  });

  test('example 4', () => {
    expect(part1(example4)).toBe(8);
  });

  test('solution', () => {
    expect(part1(input)).toBe(6968);
  });
});

describe('part 2', () => {
  test('example 5', () => {
    expect(part2(example5)).toBe(4);
  });

  test('example 6', () => {
    expect(part2(example6)).toBe(8);
  });

  test('example 7', () => {
    expect(part2(example7)).toBe(10);
  });

  test('solution', () => {
    expect(part2(input)).toBe(413);
  });
});
