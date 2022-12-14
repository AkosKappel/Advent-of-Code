import { existsSync, readFileSync } from 'fs';

const dayNumber = 'day12.input.ts'.match(/\d+/)?.filter(Number)[0];
const inputFile: string = `input/day${dayNumber}.in`;

export const input: string = `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`;
export const answer1 = 31;
export const answer2 = 29;

export const puzzleAnswer1 = 534;
export const puzzleAnswer2 = 525;
export const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';
