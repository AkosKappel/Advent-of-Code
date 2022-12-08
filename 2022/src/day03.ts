const parse = (s: string) => s.trim().split('\n');

const ord = (c: string, start: string, offset: number = 1): number =>
  c.charCodeAt(0) - start.charCodeAt(0) + offset;

const isLowerCase = (c: string): boolean => {
  const code = ord(c, 'a');
  return 1 <= code && code <= 26;
};

const sum = (a: number, b: number): number => a + b;

export const part1 = (s: string): number => parse(s)
  .map((line: string) => {
    const half: number = Math.ceil(line.length / 2);
    const firstHalf: Set<string> = new Set<string>(line.slice(0, half));
    const secondHalf: Set<string> = new Set<string>(line.slice(half));
    const duplicate = [...firstHalf].filter(x => secondHalf.has(x))[0];
    return isLowerCase(duplicate) ? ord(duplicate, 'a') : ord(duplicate, 'A', 27);
  })
  .reduce(sum, 0);

exports.first = part1;

const groupify = (lines: string[], groupSize: number): string[][] => {
  return lines.reduce((acc: string[][], line: string, index: number) => {
    if (index % groupSize === 0) acc.push([]);
    acc[acc.length - 1].push(line);
    return acc;
  }, []);
};

export const part2 = (s: string): number =>
  groupify(parse(s), 3) // split elves into groups of three
    .map((group: string[]) => {
      const elf1: Set<string> = new Set<string>(group[0]);
      const elf2: Set<string> = new Set<string>(group[1]);
      const elf3: Set<string> = new Set<string>(group[2]);
      // find the intersection of the three sets
      const badge: string = [...elf1].filter(x => elf2.has(x) && elf3.has(x))[0];
      return isLowerCase(badge) ? ord(badge, 'a') : ord(badge, 'A', 27);
    }).reduce(sum, 0);

exports.second = part2;
