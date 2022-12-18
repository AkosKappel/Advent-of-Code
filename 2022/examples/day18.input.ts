import { existsSync, readFileSync } from 'fs';

const dayNumber = 'day18.input.ts'.match(/\d+/)?.filter(Number)[0];
const inputFile: string = `input/day${dayNumber}.in`;

export const input: string = `
2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5
`;
export const answer1 = 64;
export const answer2 = 58;

export const puzzleAnswer1 = 4482;
export const puzzleAnswer2 = 2576;
export const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';
