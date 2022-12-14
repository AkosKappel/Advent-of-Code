import { existsSync, readFileSync } from 'fs';

const dayNumber = 'day05.input.ts'.match(/\d+/)?.filter(Number)[0];
const inputFile: string = `input/day${dayNumber}.in`;

export const input = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;
export const answer1 = 'CMZ';
export const answer2 = 'MCD';

export const puzzleAnswer1 = 'VJSFHWGFT';
export const puzzleAnswer2 = 'LCTQFBVZV';
export const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';
