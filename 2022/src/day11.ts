interface Monkey {
  id: number;
  items: number[];
  op: (old: number) => number;
  divisibleBy: number;
  passTo: number[];
  nInspected: number;
}

enum WORRY_LEVEL {LOW, HIGH}

const NUMBER_REGEX = /\d+/g;

const parse = (s: string): Monkey[] => s.trim()
  .split('\n\n')
  .map((block: string, i: number) => {
    const [_, items, oper, divBy, isTrue, isFalse] = block.split('\n');
    return {
      id: i,
      items: items.match(NUMBER_REGEX)?.map(Number) || [],
      op: (old: number) => eval(oper.split('= ')[1]),
      divisibleBy: divBy.match(NUMBER_REGEX)?.map(Number)[0] || 1,
      passTo: [isTrue, isFalse].map((x: string) => x.match(NUMBER_REGEX)?.[0]).map(Number),
      nInspected: 0,
    };
  });

const inspect = (item: number, op: (old: number) => number, level: WORRY_LEVEL) => {
  switch (level) {
    case WORRY_LEVEL.LOW:
      return Math.floor(op(item) / 3);
    case WORRY_LEVEL.HIGH:
      return op(item);
  }
  throw new Error('Invalid worry level');
};

const keepAway = (monkeys: Monkey[], nRounds: number, worryLevel: WORRY_LEVEL): number => {
  const product = monkeys
    .map(({ divisibleBy }) => divisibleBy)
    .reduce((acc, n) => acc * n);

  for (let round = 0; round < nRounds; round++) {
    for (const monkey of monkeys) {
      const { items, op, divisibleBy, passTo } = monkey;
      monkey.nInspected += items.length;

      let item = items.shift();
      while (item) {
        const inspectedItem = inspect(item, op, worryLevel) % product;
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

export const part1 = (s: string): number => keepAway(parse(s), 20, WORRY_LEVEL.LOW);

exports.first = part1;

export const part2 = (s: string): number => keepAway(parse(s), 10_000, WORRY_LEVEL.HIGH);

exports.second = part2;
