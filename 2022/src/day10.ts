const parse = (s: string) => s.trim()
  .split('\n')
  .map(x => x.trim().split(' '))
  .map(([op, arg]) => ({ op, arg: parseInt(arg, 10) }));

export const part1 = (s: string): number => {
  const program = parse(s);
  let ticks = 0;
  let register = 1;
  let signalStrength = 0;
  let acc = 0;

  for (let i = 0; i < program.length; i++) {
    const { op, arg } = program[i];
    if (op === 'addx') {
      ticks += 2;

      if (ticks % 40 === 20) {
        signalStrength = register * ticks;
        acc += signalStrength;
        // console.log(`tick ${ticks} register ${register}, signal strength ${signalStrength}`);
      } else if (ticks % 40 === 21) {
        signalStrength = register * (ticks - 1);
        acc += signalStrength;
        // console.log(`tick ${ticks - 1} register ${register}, signal strength ${signalStrength}`);
      }

      register += arg;
    } else if (op === 'noop') {
      ticks++;

      if (ticks % 40 === 20) {
        signalStrength = register * ticks;
        acc += signalStrength;
        // console.log(`tick ${ticks} register ${register}, signal strength ${register * ticks}`);
      }
    }

  }

  return acc;
};

exports.first = part1;

const createScreen = (width: number, height: number, fillValue: string = '.'): string[][] =>
  new Array(height).fill(0).map(() => new Array(width).fill(fillValue));

const showScreen = (screen: string[][]): string =>
  '\n' + screen.map(row => row.join('')).join('\n') + '\n';

export const part2 = (s: string): string => {
  const program = parse(s);

  const [width, height] = [40, 6];
  const screen = createScreen(width, height);

  let cycle = 0;
  const tick = () => {
    cycle++;
    const cursor = (cycle - 1) % 40;
    const [row, col] = [~~((cycle - 1) / 40), cursor];
    screen[row][col] = cursor >= x - 1 && cursor <= x + 1 ? '#' : '.';
  };

  let x = 1;
  for (const { op, arg } of program) {
    switch (op) {
      case 'noop':
        tick();
        break;
      case 'addx':
        tick();
        tick();
        x += arg;
        break;
    }
  }

  return showScreen(screen);
};

exports.second = part2;
