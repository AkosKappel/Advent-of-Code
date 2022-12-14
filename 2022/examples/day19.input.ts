import { existsSync, readFileSync } from 'fs';

const dayNumber = 'day19.input.ts'.match(/\d+/)?.filter(Number)[0];
const inputFile: string = `input/day${dayNumber}.in`;

export const input: string = `

`;
export const answer1 = 0;
export const answer2 = 0;

export const puzzleAnswer1 = 0;
export const puzzleAnswer2 = 0;
export const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';
