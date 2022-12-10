import * as day from '../examples/day10.input';

const parse = (s: string) => s.trim()
  .split('\n')
  .map(x => x.trim().split(' '))
  .map(([op, arg]) => ({ op, arg: parseInt(arg, 10) }));

export const part1 = (s: string): number => {
  const program = parse(s);
  let ticks = 0;
  let register = 1;
  let signalStrength = 0;
  let signalStrengthAcc = 0;

  for (let i = 0; i < program.length; i++) {
    const { op, arg } = program[i];
    if (op === 'addx') {
      ticks += 2;
      // console.log(register);

      if (ticks % 40 === 20) {
        signalStrength = register * ticks;
        signalStrengthAcc += signalStrength;
        // console.log(`tick ${ticks} register ${register}, signal strength ${signalStrength}`);
      } else if (ticks % 40 === 21) {
        signalStrength = register * (ticks - 1);
        signalStrengthAcc += signalStrength;
        // console.log(`tick ${ticks - 1} register ${register}, signal strength ${signalStrength}`);
      }

      register += arg;
    } else if (op === 'noop') {
      ticks++;

      if (ticks % 40 === 20) {
        signalStrength = register * ticks;
        signalStrengthAcc += signalStrength;
        // console.log(`tick ${ticks} register ${register}, signal strength ${register * ticks}`);
      }
    }

  }

  return signalStrengthAcc;
};
console.log(part1(day.input));
console.log(day.answer1);

exports.first = part1;

const createScreen = (width: number, height: number, fillValue: string = '.'): string[][] =>
  new Array(height).fill(0).map(() => new Array(width).fill(fillValue));

const showScreen = (screen: string[][]): string =>
  '\n' + screen.map(row => row.join('')).join('\n') + '\n';

export const part2 = (s: string): string => {
  const program = parse(s);
  let ticks = 0;
  let register = 0;

  const spriteLength = 3;

  const [width, height] = [40, 6];
  const screen = createScreen(width, height);

  for (let i = 0; i < program.length; i++) {
    const { op, arg } = program[i];

    if (register >= ticks && register <= ticks + spriteLength) {
      const [x, y] = [ticks % width, Math.floor(ticks / width)];
      screen[y][x] = '#';
    }

    if (op === 'addx') {
      ticks += 2;
      register += arg;
    } else if (op === 'noop') {
      ticks++;
    }

  }

  return showScreen(screen);
};
console.log(part2(day.input));
console.log(day.answer2);

exports.second = part2;
