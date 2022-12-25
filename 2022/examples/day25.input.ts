import { existsSync, readFileSync } from 'fs';

const dayNumber = 'day25.input.ts'.match(/\d+/)?.filter(Number)[0];
const inputFile: string = `input/day${dayNumber}.in`;

export const input: string = `
1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122
`;
export const answer1 = 4890;
export const answer2 = '2=-1=0';

export const puzzleAnswer1 = 29361331235500;
export const puzzleAnswer2 = '2==221=-002=0-02-000';
export const puzzleInput: string = existsSync(inputFile) ? readFileSync(inputFile, 'utf8') : '0';
