import { existsSync, readFileSync } from 'fs';

const dayNumber = 'day08.input.ts'.match(/\d+/)?.filter(Number)[0];
const inputFile: string = `input/day${dayNumber}.in`;

export const input: string = `
30373
25512
65332
33549
35390
`;
export const answer1 = 21;
export const answer2 = 8;

export const puzzleAnswer1 = 1851;
export const puzzleAnswer2 = 574080;
export const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';
