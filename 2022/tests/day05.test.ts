import { readFileSync } from 'fs';
import { part1, part2 } from '../src/day05';

const dayNumber = __filename.match(/day(\d+)\.test\.ts/)?.[1];
const inputFile: string = `input/day${dayNumber}.txt`;

const example: string = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;
const input: string = readFileSync(inputFile, 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example)).toBe('CMZ');
  });
  test(`solution`, () => {
    expect(part1(input)).toBe('VJSFHWGFT');
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example)).toBe('MCD');
  });
  test(`solution`, () => {
    expect(part2(input)).toBe('LCTQFBVZV');
  });
});
