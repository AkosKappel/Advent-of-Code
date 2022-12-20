import { existsSync, readFileSync } from 'fs';

const dayNumber = 'day20.input.ts'.match(/\d+/)?.filter(Number)[0];
const inputFile: string = `input/day${dayNumber}.in`;

export const input: string = `
1
2
-3
3
-2
0
4
`;
export const answer1 = 3;
export const answer2 = 1623178306;

export const puzzleAnswer1 = 4224;
export const puzzleAnswer2 = 861907680486;
export const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';
