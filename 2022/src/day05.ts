const parse = (s: string) => {
  const [topPart, bottomPart] = s.split('\n\n');
  const [ids, ...crates] = topPart.split('\n').filter(s => s.length > 0).reverse();

  const stacks = Array.from(ids.trim().split(/ +/)).map(() => []);
  crates.forEach((crate: string) => {
    const matches = crate.matchAll(/(\[\w]| {3}) ?/g);
    stacks.forEach((stack: string[]) => {
      const char = matches.next().value[1][1]; // char of the crate e.g. '[A]' -> 'A'
      if (char !== ' ') {
        stack.push(char);
      }
    });
  });

  const instructions = bottomPart.trim().split('\n')
    .map((row: string) => row
      .replaceAll(/move |from |to /g, '')
      .split(' ')
      .map((num: string) => parseInt(num, 10)));
  return { stacks, instructions };
};

export const part1 = (s: string): string => {
  const { stacks, instructions } = parse(s);
  instructions.forEach(([n, from, to]) => {
    const crates = stacks[from - 1].splice(-n, n).reverse();
    stacks[to - 1].push(...crates);
  });
  return stacks.map(stack => stack.pop()).join('');
};

exports.first = part1;

export const part2 = (s: string): string => {
  const { stacks, instructions } = parse(s);
  instructions.forEach(([n, from, to]) => {
    const crates = stacks[from - 1].splice(-n, n);
    stacks[to - 1].push(...crates);
  });
  return stacks.map(stack => stack.pop()).join('');
};

exports.second = part2;
