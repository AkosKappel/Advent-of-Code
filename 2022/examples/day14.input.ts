import { existsSync, readFileSync } from 'fs';

const dayNumber = 'day14.input.ts'.match(/\d+/)?.filter(Number)[0];
const inputFile: string = `input/day${dayNumber}.in`;

export const input: string = `
498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
`;
export const answer1 = 24;
export const answer2 = 93;

export const puzzleAnswer1 = 913;
export const puzzleAnswer2 = 30762;
export const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';
