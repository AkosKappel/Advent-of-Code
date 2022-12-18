import { range } from 'lodash';

const DIRECTIONS = [ // [x, y, z]
  [-1, 0, 0],
  [1, 0, 0],
  [0, -1, 0],
  [0, 1, 0],
  [0, 0, -1],
  [0, 0, 1],
];

const parse = (s: string): number[][] => s.trim()
  .split('\n')
  .map(line => line.split(',').map(Number));

const sum = (a: number, b: number) => a + b;

const neighbours = (cube: number[]): number[][] => {
  const [x, y, z] = cube;
  return DIRECTIONS.map(([dx, dy, dz]) => [x + dx, y + dy, z + dz]);
};

export const part1 = (s: string): number => {
  const cubes: number[][] = parse(s);

  const map = new Map<string, number>();
  for (const cube of cubes) {
    const key = cube.join(',');
    map.set(key, 6); // initially all faces are visible
  }

  for (const cube of cubes) {
    for (const neighbour of neighbours(cube)) {
      const key = neighbour.join(',');
      if (map.has(key)) {
        map.set(key, map.get(key)! - 1);
      }
    }
  }

  return Array.from(map.values()).reduce(sum, 0);
};

exports.first = part1;

export const part2 = (s: string): number => {
  const cubes: number[][] = parse(s)
    .map(([x, y, z]: number[]) => [x + 1, y + 1, z + 1]);

  // find dimensions of the grid
  const maxX = Math.max(...cubes.map(c => c[0])) + 1;
  const maxY = Math.max(...cubes.map(c => c[1])) + 1;
  const maxZ = Math.max(...cubes.map(c => c[2])) + 1;

  // create 3D array
  const grid: boolean[][][] = range(0, maxX + 1)
    .map(() => range(0, maxY + 1)
      .map(() => range(0, maxZ + 1)
        .map(() => false)));

  // initialize grid
  cubes.forEach(([x, y, z]: number[]) => grid[x][y][z] = true);

  // start from corner of grid
  const floodSeed: number[] = [0, 0, 0];
  const queue: number[][] = [floodSeed];
  const visited: boolean[][][] = grid.map(plane => plane.map(row => row.map(cell => false)));

  let count: number = 0;
  while (queue.length > 0) {
    const [x, y, z]: number[] = queue.pop()!;

    if (visited[x][y][z]) continue;
    visited[x][y][z] = true;

    // check every neighbour
    for (const [dx, dy, dz] of DIRECTIONS) {
      const [nx, ny, nz]: number[] = [x + dx, y + dy, z + dz];

      // check if cube is within bounds
      if (nx < 0 || nx > maxX) continue;
      if (ny < 0 || ny > maxY) continue;
      if (nz < 0 || nz > maxZ) continue;

      // check if cube is active
      if (grid[nx][ny][nz]) {
        count++;
        continue;
      }

      queue.push([nx, ny, nz]);
    }
  }

  return count;
};

exports.second = part2;
