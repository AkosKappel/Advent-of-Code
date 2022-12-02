const parse = (s: string) => s
  .trim()
  .split('\n\n')
  .map((elf: string) => elf.split('\n').map(Number));

export const part1 = (s: string) =>
  parse(s)
    .map((elf: number[]) => elf.reduce((a: number, b: number) => a + b))
    .reduce((a: number, b: number) => Math.max(a, b));

exports.first = part1;

export const part2 = (s: string) =>
  parse(s)
    .map((elf: number[]) => elf.reduce((a: number, b: number) => a + b))
    .sort((a: number, b: number) => b - a)
    .slice(0, 3) // largest 3 numbers
    .reduce((a: number, b: number) => a + b);

exports.second = part2;
