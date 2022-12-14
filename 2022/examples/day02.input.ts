import { existsSync, readFileSync } from 'fs';

const dayNumber = 'day02.input.ts'.match(/\d+/)?.filter(Number)[0];
const inputFile: string = `input/day${dayNumber}.in`;

export const input: string = `
A Y
B X
C Z
`;
export const answer1 = 15;
export const answer2 = 12;

export const puzzleAnswer1 = 11873;
export const puzzleAnswer2 = 12014;
export const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';
