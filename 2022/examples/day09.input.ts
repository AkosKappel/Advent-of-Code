import { existsSync, readFileSync } from 'fs';

const dayNumber = 'day09.input.ts'.match(/\d+/)?.filter(Number)[0];
const inputFile: string = `input/day${dayNumber}.in`;

export const input: string = `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`;
export const input2: string = `
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`;
export const answer1 = 13;
export const answer2 = 1;
export const answer2_2 = 36;

export const puzzleAnswer1 = 6486;
export const puzzleAnswer2 = 2678;
export const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';
