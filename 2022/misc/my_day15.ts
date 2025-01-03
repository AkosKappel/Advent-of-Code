// NOTE: valid solution only for small grids
//       otherwise the heap limit is exceeded
const DIRECTIONS: number[][] = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const manhattanDistance = (a: number[], b: number[]): number =>
  a.reduce(
    (sum: number, num: number, i: number) => sum + Math.abs(num - b[i]),
    0,
  );

const outOfBounds = (tunnel: string[][], x: number, y: number): boolean =>
  x < 0 || y < 0 || x >= tunnel[0].length || y >= tunnel.length;

const parse = (s: string): number[][] =>
  s
    .trim()
    .split('\n')
    .map((line) => line.match(/(-?\d+)/g)!.map(Number))
    .map(([sx, sy, bx, by]: number[]) => [
      sx,
      sy,
      bx,
      by,
      manhattanDistance([sx, sy], [bx, by]),
    ]);

// NOTE: gives FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
const exploreTunnelRec = (
  tunnel: string[][],
  start: number[],
  distance: number,
) => {
  // max distance reached
  if (distance < 0) return;

  // check if out of bounds
  const [x, y] = start;
  if (outOfBounds(tunnel, x, y)) return;

  // set current position to visited
  if (tunnel[y][x] === '.') tunnel[y][x] = '#';

  // explore each direction from current position
  DIRECTIONS.forEach(([dx, dy]: number[]) =>
    exploreTunnelRec(tunnel, [x + dx, y + dy], distance - 1),
  );
};

const exploreTunnel = (
  tunnel: string[][],
  start: number[],
  distance: number,
) => {
  // depth first search
  const stack: number[][] = [start];
  const visited: Set<string> = new Set();

  while (stack.length) {
    const [x, y] = stack.pop()!;

    // check if position is out of bounds
    if (outOfBounds(tunnel, x, y)) continue;

    // skip visited positions
    const key = `${x},${y}`;
    if (visited.has(key)) continue;

    // mark current position as visited
    visited.add(key);
    if (tunnel[y][x] === '.') tunnel[y][x] = '#';

    // explore each direction from current position if distance is not exceeded
    DIRECTIONS.map(([dx, dy]: number[]) => [x + dx, y + dy])
      .filter(
        ([x, y]: number[]) => manhattanDistance(start, [x, y]) <= distance,
      )
      .forEach(([x, y]: number[]) => stack.push([x, y]));
  }
};

const getExtremes = (coords: number[][]): number[] =>
  coords.reduce(
    ([minX, minY, maxX, maxY], [sensorX, sensorY, beaconX, beaconY, dist]) => [
      Math.min(minX, sensorX, beaconX, sensorX - dist),
      Math.min(minY, sensorY, beaconY, sensorY - dist),
      Math.max(maxX, sensorX, beaconX, sensorX + dist),
      Math.max(maxY, sensorY, beaconY, sensorY + dist),
    ],
    [Infinity, Infinity, -Infinity, -Infinity],
  );

const buildTunnel = (input: string) => {
  const coords: number[][] = parse(input);
  const [minX, minY, maxX, maxY] = getExtremes(coords);

  const [width, height]: number[] = [maxX - minX + 1, maxY - minY + 1];
  const tunnel: string[][] = new Array(height)
    .fill(0)
    .map(() => new Array(width).fill('.'));

  coords.forEach(([sensorX, sensorY, beaconX, beaconY]: number[]) => {
    const [sx, sy] = [sensorX - minX, sensorY - minY];
    const [bx, by] = [beaconX - minX, beaconY - minY];
    tunnel[sy][sx] = 'S';
    tunnel[by][bx] = 'B';

    const dist = manhattanDistance([sx, sy], [bx, by]);
    exploreTunnel(tunnel, [sx, sy], dist);
  });

  return { tunnel, minX, minY, maxX, maxY };
};

export const part1 = (s: string, targetY: number): number => {
  const { tunnel, minY } = buildTunnel(s);
  const targetLine = tunnel[targetY - minY];

  // console.log(tunnel.map(line => line.join('')).join('\n'));
  // console.log('width', tunnel[0].length, 'height', tunnel.length);
  // console.log(targetLine.join(''));

  return targetLine.filter((c) => c === '#').length;
};

exports.first = part1;

export const part2 = (s: string): number => {
  const { tunnel, minX, minY } = buildTunnel(s);

  for (let i = 0; i < tunnel.length; i++) {
    for (let j = 0; j < tunnel[0].length; j++) {
      if (
        tunnel[i][j] === '.' &&
        DIRECTIONS.every(
          ([dx, dy]: number[]) =>
            !outOfBounds(tunnel, j + dx, i + dy) &&
            tunnel[i + dy][j + dx] === '#',
        )
      ) {
        const [x, y] = [j + minX, i + minY];
        return x * 4_000_000 + y;
      }
    }
  }

  // no solution found
  return -1;
};

// WARNING: takes too much memory
exports.second = part2;
