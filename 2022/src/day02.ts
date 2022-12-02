const ord = (c: string, start: string, offset: number = 1) =>
  c.charCodeAt(0) - start.charCodeAt(0) + offset;

const parse = (s: string) => s
  .trim()
  .split('\n')
  .map((line: string) => {
    const [a, b] = line.split(' ');
    return [ord(a, 'A'), ord(b, 'X')];
  });

export const part1 = (s: string) => parse(s)
  .reduce((acc: number, [opponent, me]) => {
    if (opponent === me) { // draw
      return acc + me + 3;
    } else if (opponent === me - 1 || opponent === me + 2) { // win
      return acc + me + 6;
    } else { // lose
      return acc + me;
    }
  }, 0);

exports.first = part1;

export const part2 = (s: string) => parse(s)
  .reduce((acc: number, [opponent, result]) => {
    switch (result) {
      case 1: // lose
        return acc + (opponent == 1 ? 3 : opponent - 1);
      case 2: // draw
        return acc + 3 + opponent;
      case 3: // win
        return acc + 6 + (opponent == 3 ? 1 : opponent + 1);
      default:
        throw new Error(`Unexpected result: ${result}`);
    }
  }, 0);

exports.second = part2;
