import { existsSync, readFileSync } from 'fs';

const dayNumber = 'day19.input.ts'.match(/\d+/)?.filter(Number)[0];
const inputFile: string = `input/day${dayNumber}.in`;

export const input: string = `
Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.
`;
export const answer1 = 33;
export const answer2 = 0;

export const puzzleAnswer1 = 0;
export const puzzleAnswer2 = 0;
export const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';
