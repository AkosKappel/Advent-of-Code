import { existsSync, readFileSync } from 'fs';

const dayNumber = 'day01.input.ts'.match(/\d+/)?.filter(Number)[0];
const inputFile: string = `input/day${dayNumber}.in`;

export const input: string = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;
export const answer1 = 24000;
export const answer2 = 45000;

export const puzzleAnswer1 = 69626;
export const puzzleAnswer2 = 206780;
export const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';
