const NOOP: string = 'noop';
const ADDX: string = 'addx';

const parse = (s: string) => s.trim()
  .split('\n')
  .map(x => x.trim().split(' '))
  .map(([op, arg]) => ({ op, arg: parseInt(arg, 10) }));

const sum = (a: number, b: number): number => a + b;

export const part1 = (s: string): number => {
  const program = parse(s);

  let cycle: number = 0;
  let register: number = 1;
  const signalStrengths: number[] = [];

  const tick = () => {
    cycle++;
    if (cycle % 40 === 20) {
      signalStrengths.push(register * cycle);
    }
  };

  for (const { op, arg } of program) {
    switch (op) {
      case NOOP:
        tick();
        break;
      case ADDX:
        tick();
        tick();
        register += arg;
        break;
    }
  }

  return signalStrengths.reduce(sum);
};

exports.first = part1;

const createScreen = (width: number, height: number, fillValue: string = '.'): string[][] =>
  new Array(height).fill(0).map(() => new Array(width).fill(fillValue));

const displayScreen = (screen: string[][]): string =>
  '\n' + screen.map(row => row.join('')).join('\n') + '\n';

export const part2 = (s: string): string => {
  const program = parse(s);

  const [width, height] = [40, 6];
  const screen = createScreen(width, height);

  let cycle = 0;
  const tick = () => {
    const [row, col] = [~~(cycle / 40), cycle % 40];
    screen[row][col] = register - 1 <= col && col <= register + 1 ? '#' : '.';
    cycle++;
  };

  let register = 1;
  for (const { op, arg } of program) {
    switch (op) {
      case NOOP:
        tick();
        break;
      case ADDX:
        tick();
        tick();
        register += arg;
        break;
    }
  }

  return displayScreen(screen);
};

exports.second = part2;
