const parse = (s: string): any[][] => s.trim()
  .split('\n\n')
  .map((block: string) => block.split('\n').map(packet => JSON.parse(packet)));

const compare = (left: any, right: any): number => {
  // both are numbers
  if ([left, right].every(value => +value === value)) return left - right;

  // transform inner numbers to arrays if necessary
  [left, right] = [left, right].map(value => (+value === value ? [value] : value));

  // recursively compare nested arrays
  return left.reduce((acc: number, value: any, i: number) =>
    acc || compare(value, right[i] ?? value), 0) || left.length - right.length;
};

export const part1 = (s: string): number => parse(s)
  .map((g: any[], i: number): [any[], number] => [g, i])
  .filter(([[l, r]]) => compare(l, r) < 0)
  .map(([_, i]: [any[], number]) => i + 1)
  .reduce((acc: number, v: number) => acc + v, 0);

exports.first = part1;

export const part2 = (s: string): number => {
  const dividerPackets = [[[2]], [[6]]];
  return parse(s)
    .flat()
    .concat(dividerPackets)
    .sort(compare)
    .map((v, i) => [v, i])
    .filter(([v]) => dividerPackets.some(packet => packet === v))
    .map(([_, i]) => i + 1)
    .reduce((acc, v) => acc * v, 1);
};

exports.second = part2;
