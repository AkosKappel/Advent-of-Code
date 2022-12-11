interface Monkey {
  items: number[];
  op: (old: number) => number;
  divisibleBy: number;
  passTo: number[];
  nInspected: number;
}

const NUMBER_REGEX = /\d+/g;

const parse = (s: string): Monkey[] => s.trim()
  .split('\n\n')
  .map((block: string) => block.split('\n'))
  .map(([_, items, oper, divBy, ifTrue, ifFalse]) => ({
    items: items.match(NUMBER_REGEX)?.map(Number) || [],
    op: (old: number) => eval(oper.split('=')[1].trim()),
    divisibleBy: divBy.match(NUMBER_REGEX)?.map(Number)[0] || 1,
    passTo: [ifTrue, ifFalse].map((x: string) => x.match(NUMBER_REGEX)?.[0]).map(Number),
    nInspected: 0,
  }));

const keepAway = (monkeys: Monkey[], nRounds: number, divisor: number = 1): number => {
  const product = monkeys
    .map(({ divisibleBy }) => divisibleBy)
    .reduce((acc: number, n: number) => acc * n);

  const inspect = (x: number, func: (old: number) => number) =>
    Math.floor(func(x) / divisor) % product;

  for (let round = 0; round < nRounds; round++) {
    for (const monkey of monkeys) {
      const { items, op, divisibleBy, passTo } = monkey;
      monkey.nInspected += items.length;

      let item = items.shift();
      while (item) {
        const inspectedItem = inspect(item, op);
        const j = passTo[+!!(inspectedItem % divisibleBy)];
        monkeys[j].items.push(inspectedItem);
        item = items.shift();
      }
    }
  }

  return monkeys.map(({ nInspected }) => nInspected)
    .sort((a: number, b: number) => b - a)
    .slice(0, 2)
    .reduce((a: number, b: number) => a * b);
};

export const part1 = (s: string): number => keepAway(parse(s), 20, 3);

exports.first = part1;

export const part2 = (s: string): number => keepAway(parse(s), 10_000);

exports.second = part2;
