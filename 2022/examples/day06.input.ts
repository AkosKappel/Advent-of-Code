import { existsSync, readFileSync } from 'fs';

const dayNumber = 'day06.input.ts'.match(/\d+/)?.filter(Number)[0];
const inputFile: string = `input/day${dayNumber}.in`;

export const input: string = `
mjqjpqmgbljsphdztnvjfqwrcgsmlb
`;
export const input2: string = `
bvwbjplbgvbhsrlpgdmjqwftvncz
`;
export const input3: string = `
nppdvjthqldpwncqszvftbrmjlhg
`;
export const input4: string = `
nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg
`;
export const input5: string = `
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw
`;
export const answer1 = 7;
export const answer1_2 = 5;
export const answer1_3 = 6;
export const answer1_4 = 10;
export const answer1_5 = 11;

export const answer2 = 19;
export const answer2_2 = 23;
export const answer2_3 = 23;
export const answer2_4 = 29;
export const answer2_5 = 26;

export const puzzleAnswer1 = 1655;
export const puzzleAnswer2 = 2665;
export const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';
