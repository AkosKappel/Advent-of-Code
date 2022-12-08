const parse = (s: string) => s.trim()
  .split('\n')
  .map(line => line.split(',')
    .map(range => range.split('-').map(Number)));

export const part1 = (s: string): number => parse(s)
  .filter(([[s1, e1], [s2, e2]]) =>
    s1 <= s2 && e2 <= e1 || s2 <= s1 && e1 <= e2)
  .length;

exports.first = part1;

export const part2 = (s: string): number => parse(s)
  .filter(([[s1, e1], [s2, e2]]) =>
    Math.max(s1, s2) <= Math.min(e1, e2))
  .length;

exports.second = part2;
