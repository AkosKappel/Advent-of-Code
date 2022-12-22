import { existsSync, readFileSync } from 'fs';

const dayNumber = 'day22.input.ts'.match(/\d+/)?.filter(Number)[0];
const inputFile: string = `input/day${dayNumber}.in`;

export const input: string = `
        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5
`;
export const answer1 = 6032;
export const answer2 = 5031;

export const puzzleAnswer1 = 43466;
export const puzzleAnswer2 = 0;
export const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';
