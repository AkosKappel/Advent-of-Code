import { existsSync, readFileSync } from 'fs';

const dayNumber = 'day24.input.ts'.match(/\d+/)?.filter(Number)[0];
const inputFile: string = `input/day${dayNumber}.in`;

export const input: string = `
#.#####
#.....#
#>....#
#.....#
#...v.#
#.....#
#####.#
`;
export const input2: string = `
#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#
`;
export const answer1 = 10;
export const answer1_2 = 18;
export const answer2 = 30;
export const answer2_2 = 54;

export const puzzleAnswer1 = 301;
export const puzzleAnswer2 = 859;
export const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';
