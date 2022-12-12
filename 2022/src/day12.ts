import * as day from '../examples/day12.input';

const DIRECTION: { [dir: string]: number[] } = {
  U: [0, -1],
  D: [0, 1],
  L: [-1, 0],
  R: [1, 0],
};

const ord = (c: string, start: string, offset: number = 0): number =>
  c.charCodeAt(0) - start.charCodeAt(0) + offset;

const getCoordsOf = (char: string, map: string): number[] => map
  .split('\n').reduce((acc, line, y) => {
    const x = line.indexOf(char);
    return x >= 0 ? [x, y] : acc;
  }, [0, 0]);

const parse = (s: string) => ({
  start: getCoordsOf('S', s),
  end: getCoordsOf('E', s),
  map: s
    .replace('S', 'a')
    .replace('E', 'z')
    .split('\n')
    .map(line => line.split('').map(c => ord(c, 'a'))),
  height: s.split('\n').length,
  width: s.split('\n')[0].length,
});

const dijkstra = (start: number[], end: number[], map: number[][]): number => {
  const [sx, sy] = start;
  const [ex, ey] = end;
  const [w, h] = [map[0].length, map.length];

  const dist = Array(h).fill(0).map(() => Array(w).fill(Infinity));
  const prev = Array(h).fill(0).map(() => Array(w).fill(null));
  const queue = [[sx, sy, 0]];

  dist[start[1]][start[0]] = 0;
  queue.push(start);

  while (queue.length > 0) {
    const [x, y] = queue.shift()!;
    const d = dist[y][x];

    for (const [dx, dy] of Object.values(DIRECTION)) {
      const [nx, ny] = [x + dx, y + dy];
      if (nx < 0 || nx >= w || ny < 0 || ny >= h || map[ny][nx] > map[y][x] + 1) continue;

      if (d + 1 < dist[ny][nx]) {
        dist[ny][nx] = d + 1;
        prev[ny][nx] = [x, y];
        queue.push([nx, ny]);
      }
    }
  }

  return dist[ey][ex];
};

export const part1 = (s: string): number => {
  const grid = parse(s.trim());
  return dijkstra(grid.start, grid.end, grid.map);
};

exports.first = part1;

export const part2 = (s: string): number => {
  const grid = parse(s.trim());
  return grid.map
    .map((line: number[], y: number) => line.map((height: number, x: number) =>
      height === 0 ? dijkstra([x, y], grid.end, grid.map) : Infinity))
    .flat()
    .reduce((acc, d) => Math.min(acc, d));
};

exports.second = part2;

// console.log(part1(day.input));
// console.log(day.answer1);
console.log(part2(day.input));
console.log(day.answer2);
