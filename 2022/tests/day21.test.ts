import { readFileSync } from 'fs';
import { part1, part2 } from '../src/day21';

const dayNumber = __filename.match(/day(\d+)\.test\.ts/)?.[1];
const inputFile: string = `input/day${dayNumber}.txt`;

const example: string = `
root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32
`.trim();
const input: string = readFileSync(inputFile, 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example)).toBe(152);
  });
  test(`solution`, () => {
    expect(part1(input)).toBe(41857219607906);
  });
});

describe('part 2', () => {
  test('example', () => {
    expect(part2(example)).toBe(301);
  });
  test(`solution`, () => {
    expect(part2(input)).toBe(3916936880448);
  });
});
