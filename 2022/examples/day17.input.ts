import { existsSync, readFileSync } from 'fs';

const dayNumber = 'day17.input.ts'.match(/\d+/)?.filter(Number)[0];
const inputFile: string = `input/day${dayNumber}.in`;

export const input: string = `
>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>
`;
export const answer1 = 3068;
export const answer2 = 1514285714288;

export const puzzleAnswer1 = 3065;
export const puzzleAnswer2 = 1562536022966;
export const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';
