import { existsSync, readFileSync } from 'fs';

const dayNumber = 'day04.input.ts'.match(/\d+/)?.filter(Number)[0];
const inputFile: string = `input/day${dayNumber}.in`;

export const input: string = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`;
export const answer1 = 2;
export const answer2 = 4;

export const puzzleAnswer1 = 483;
export const puzzleAnswer2 = 874;
export const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';
