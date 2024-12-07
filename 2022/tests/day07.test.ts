import { readFileSync } from 'fs';
import { part1, part2 } from '../src/day07';

const dayNumber = __filename.match(/day(\d+)\.test\.ts/)?.[1];
const inputFile: string = `input/day${dayNumber}.txt`;

const example: string = `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`.trim();
const input: string = readFileSync(inputFile, 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example)).toBe(95437);
  });
  test(`solution`, () => {
    expect(part1(input)).toBe(1232307);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example)).toBe(24933642);
  });
  test(`solution`, () => {
    expect(part2(input)).toBe(7268994);
  });
});
