const manhattanDistance = (a: number[], b: number[]): number =>
  a.reduce((sum: number, num: number, i: number) => sum + Math.abs(num - b[i]), 0);

const parse = (s: string) => s.trim()
  .split('\n')
  .map(line => line.match(/(-?\d+)/g)!.map(Number))
  .map(([x, y, bx, by]: number[]) => ({ x, y, bx, by, dist: manhattanDistance([x, y], [bx, by]) }));

export const part1 = (s: string, targetY: number): number => {
  const data = parse(s);
  const ranges: number[][] = [];

  data.forEach((sensor) => {
    const dy = sensor.dist - Math.abs(targetY - sensor.y);
    if (dy > 0) ranges.push([sensor.x - dy, sensor.x + dy]);
  });

  const ranges2: number[] = ranges.flat().sort((a, b) => a - b);
  return Math.abs(ranges2[0] - ranges2.pop()!);
};

exports.first = part1;

const intersect = (p1: number[], p2: number[], p3: number[], p4: number[]): number[] => {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  const [x3, y3] = p3;
  const [x4, y4] = p4;

  const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  const x = x1 + ua * (x2 - x1);
  const y = y1 + ua * (y2 - y1);
  return [~~x, ~~y];
};

export const part2 = (s: string): number => {
  const data = parse(s);

  const maxY = data.length == 14 ? 20 : 4000000;
  const targetY = data.length == 14 ? 20 : 2000000;

  const diamonds: number[][][] = data.map((sensor) => {
    const d = sensor.dist + 1;
    return [
      [sensor.x + d, sensor.y],
      [sensor.x, sensor.y + d],
      [sensor.x - d, sensor.y],
      [sensor.x, sensor.y - targetY],
    ];
  });

  for (let i = 0; i < diamonds.length; i++) {
    const d1: number[][] = diamonds[i];

    for (let j = i + 1; j < diamonds.length; j++) {
      const d2: number[][] = diamonds[j];

      for (let s1 = 0; s1 < 4; s1++) {
        for (let s2 = 0; s2 < 4; s2++) {

          const [x, y] = intersect(d1[s1], d1[(s1 + 1) % 4], d2[s2], d2[(s2 + 1) % 4]);
          if (x >= 0 && x <= maxY && y >= 0 && y <= maxY &&
            data.every((s) => manhattanDistance([s.x, s.y], [x, y]) > s.dist)) {
            return x * 4_000_000 + y;
          }
        }
      }
    }
  }

  // no gap found
  return -1;
};

exports.second = part2;
