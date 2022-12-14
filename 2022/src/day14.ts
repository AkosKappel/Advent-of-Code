import * as day from '../examples/day14.input';

const SPAWN_POINT: number[] = [500, 0];
const X_DIRS: number[] = [-1, 0, 1];

const EMPTY: string = '.';
const ROCK: string = '#';
const SAND: string = 'o';
const HOLE: string = '+';

const parse = (s: string) => s.trim()
  .split('\n')
  .map(line => line.split(' -> ')
    .map(s => s.split(',').map(Number)));

const buildCave = (input: string, addFloor: boolean = false) => {
  const lines: number[][][] = parse(input);
  const [spawnX, spawnY] = SPAWN_POINT;

  let [minX, minY, maxX, maxY] = lines
    .flat()
    .concat([SPAWN_POINT])
    .reduce(([minX, minY, maxX, maxY], [x, y]) =>
        [Math.min(minX, x), Math.min(minY, y), Math.max(maxX, x), Math.max(maxY, y)],
      [Infinity, Infinity, -Infinity, -Infinity]);

  const floor: number[][] = [];
  if (addFloor) {
    const height = maxY - minY + 1;
    const floorY = maxY - minY + 2;
    const floorX1 = Math.max(spawnX - minX - height, 0);
    const floorX2 = spawnX - minX + height;
    maxY = floorY;
    minX = floorX1;
    maxX = floorX2;
    floor.concat([[floorX1, floorY], [floorX2, floorY]]);
    console.log(floor);
  }

  const cave = new Array(maxY - minY + 1).fill(0)
    .map(() => new Array(maxX - minX + 1).fill(EMPTY));

  lines.concat(floor).forEach(line => {
    line.reduce((start: number[], end: number[]) => {
      const [x1, y1] = start;
      const [x2, y2] = end;

      if (x1 === x2) { // draw vertical line
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
          cave[y - minY][x1 - minX] = ROCK;
        }
      } else if (y1 === y2) { // draw horizontal line
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
          cave[y1 - minY][x - minX] = ROCK;
        }
      }

      return end;
    });
  });
  cave[spawnY - minY][spawnX - minX] = HOLE;

  return { cave, minX, minY, maxX, maxY };
};

export const part1 = (s: string): number => {
  const { cave, minX, minY, maxX, maxY } = buildCave(s);

  let numSandTiles = 0;
  let sand = [SPAWN_POINT[0] - minX, SPAWN_POINT[1] - minY];

  let keepSpawning: boolean = true;
  while (keepSpawning) {
    const [x, y] = sand;

    // can move down
    if (X_DIRS.some(dx => cave[y + 1][x + dx] === EMPTY)) {
      if (cave[y + 1][x] === EMPTY) { // move straight down
        sand = [x, y + 1];
      } else if (cave[y + 1][x - 1] === EMPTY) { // move down left
        sand = [x - 1, y + 1];
      } else if (cave[y + 1][x + 1] === EMPTY) { // move down right
        sand = [x + 1, y + 1];
      }
    }
    // fell out of bounds
    else if (X_DIRS.some(dx => !cave[y + 1][x + dx])) {
      keepSpawning = false;
    }
    // can't move any further down, spawn new sand particle
    else {
      sand = [SPAWN_POINT[0] - minX, SPAWN_POINT[1] - minY];
      cave[y][x] = SAND;
      numSandTiles++;
    }
  }

  return numSandTiles;
};

exports.first = part1;

export const part2 = (s: string): number => {
  const { cave, minX, minY, maxX, maxY } = buildCave(s, true);

  let numSandTiles = 0;

  console.log(cave.map(line => line.join('')).join('\n'));

  return numSandTiles;
};

exports.second = part2;

console.log(part1(day.input));
console.log(day.answer1);
// console.log(part2(day.input));
// console.log(day.answer2);
