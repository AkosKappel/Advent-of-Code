const DIRECTION: { [dir: string]: number[] } = {
  U: [0, -1],
  D: [0, 1],
  L: [-1, 0],
  R: [1, 0],
};

const ord = (c: string, start: string = 'a', offset: number = 0): number =>
  c.charCodeAt(0) - start.charCodeAt(0) + offset;

const getAllCoordsOf = (char: string, s: string): number[][] => s
  .split('\n')
  .reduce((acc: number[][], line: string, y: number) => {
    const x: number = line.indexOf(char);
    return x >= 0 ? [...acc, [x, y]] : acc;
  }, []);

interface Map {
  start: number[];
  end: number[];
  grid: number[][];
  height: number;
  width: number;
}

const parse = (s: string): Map => ({
  start: getAllCoordsOf('S', s)[0],
  end: getAllCoordsOf('E', s)[0],
  grid: s
    .replace('S', 'a')
    .replace('E', 'z')
    .split('\n')
    .map(line => line.split('').map(c => ord(c))),
  height: s.split('\n').length,
  width: s.split('\n')[0].length,
});

const dijkstra = (map: Map, start: number[], end: number[]): number => {
  const [sx, sy] = start;
  const [ex, ey] = end;
  const [w, h] = [map.width, map.height];
  const grid = map.grid;

  const dist: number[][] = Array(h).fill(0).map(() => Array(w).fill(Infinity));
  const prev: number[][][] = Array(h).fill(0).map(() => Array(w).fill(null));
  const queue: number[][] = [start];

  dist[sy][sx] = 0;

  loop: while (queue.length > 0) {
    const [x, y] = queue.shift()!;
    const d = dist[y][x];

    for (const [dx, dy] of Object.values(DIRECTION)) {
      const [nx, ny] = [x + dx, y + dy];

      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue; // out of bounds
      if (grid[ny][nx] > grid[y][x] + 1) continue; // too high to climb

      if (d + 1 < dist[ny][nx]) {
        dist[ny][nx] = d + 1;
        prev[ny][nx] = [x, y];
        queue.push([nx, ny]);
      }

      if ([nx, ny] === end) break loop;
    }
  }

  return dist[ey][ex];
};

export const part1 = (s: string): number => {
  const map = parse(s.trim());
  return dijkstra(map, map.start, map.end);
};

exports.first = part1;

const hasIncreasedNeighbour = ([x, y]: number[], grid: number[][], increase: number = 1): boolean =>
  Object.values(DIRECTION).some(([dx, dy]: number[]) => {
    const [nx, ny] = [x + dx, y + dy];
    return grid[ny] && grid[ny][nx] === grid[y][x] + increase;
  });

export const part2 = (s: string): number => {
  const map = parse(s.trim());
  return map.grid
    .flatMap((line: number[], y: number) => line.map((height: number, x: number) =>
      height === 0 && hasIncreasedNeighbour([x, y], map.grid) ?
        dijkstra(map, [x, y], map.end) :
        Infinity))
    .reduce((acc: number, d: number) => Math.min(acc, d));
};

exports.second = part2;
