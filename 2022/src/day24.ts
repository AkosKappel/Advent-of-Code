const parse = (s: string) => s.trim();

export const part1 = (s: string): number => {
  parse(s);
  return 0;
};

exports.first = part1;

export const part2 = (s: string): number => {
  parse(s);
  return 0;
};

exports.second = part2;

import * as day from '../examples/day24.input';

console.time('Run');
console.log(part1(day.input));
console.log(day.answer1);
// console.log(part1(day.puzzleInput));
// console.log(day.puzzleAnswer1);
// console.log(part2(day.input));
// console.log(day.answer2);
// console.log(part2(day.puzzleInput));
// console.log(day.puzzleAnswer2);
console.timeEnd('Run');
