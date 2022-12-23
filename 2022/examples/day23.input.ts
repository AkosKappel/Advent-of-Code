import { existsSync, readFileSync } from 'fs';

const dayNumber = 'day23.input.ts'.match(/\d+/)?.filter(Number)[0];
const inputFile: string = `input/day${dayNumber}.in`;

export const input: string = `
....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..
`;
export const answer1 = 110;
export const answer2 = 20;

export const puzzleAnswer1 = 3987;
export const puzzleAnswer2 = 938;
export const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';
