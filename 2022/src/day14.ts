const SPAWN_POINT: number[] = [500, 0];

enum Block {
  EMPTY = '.',
  ROCK = '#',
  SAND = 'o',
  HOLE = '+',
}

const parse = (s: string) => s.trim()
  .split('\n')
  .map(line => line.split(' -> ')
    .map(s => s.split(',').map(Number)));

const buildCave = (input: string, addFloor: boolean) => {
  const lines: number[][][] = parse(input);
  const [spawnX, spawnY] = SPAWN_POINT;

  let [minX, minY, maxX, maxY] = lines
    .flat()
    .concat([SPAWN_POINT])
    .reduce(([minX, minY, maxX, maxY], [x, y]) =>
        [Math.min(minX, x), Math.min(minY, y), Math.max(maxX, x), Math.max(maxY, y)],
      [Infinity, Infinity, -Infinity, -Infinity]);

  // create floor for part 2
  const floor: number[][][] = [];
  if (addFloor) {
    const floorY = maxY + 2;
    const floorStartX = spawnX - floorY - 1;
    const floorEndX = spawnX + floorY + 1;
    maxY = floorY;
    minX = floorStartX;
    maxX = floorEndX;
    floor.push([[floorStartX, floorY], [floorEndX, floorY]]);
  }

  // build grid for the cave
  const cave: string[][] = new Array(maxY - minY + 1).fill(0)
    .map(() => new Array(maxX - minX + 1).fill(Block.EMPTY));

  // fill in the cave with lines of rock
  lines.concat(floor).forEach(line => {
    line.reduce((start: number[], end: number[]) => {
      const [x1, y1] = start;
      const [x2, y2] = end;

      if (x1 === x2) { // draw vertical line
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
          cave[y - minY][x1 - minX] = Block.ROCK;
        }
      } else if (y1 === y2) { // draw horizontal line
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
          cave[y1 - minY][x - minX] = Block.ROCK;
        }
      }

      return end;
    });
  });

  // display spawn point
  cave[spawnY - minY][spawnX - minX] = Block.HOLE;

  // console.log(cave.map(line => line.join('')).join('\n'));
  // console.log('width:', cave[0].length, 'height:', cave.length);

  return { cave, minX, minY, maxX, maxY };
};

const isWithinBounds = (cave: string[][], pos: number[]) => {
  const [x, y] = pos;
  return y >= 0 && y < cave.length && x >= 0 && x < cave[y].length;
};

const dfs = (cave: string[][], pos: number[],
             result: { numSandTiles: number, counting: boolean },
             visited: Set<string> = new Set()): number => {
  if (!isWithinBounds(cave, pos)) return -1;

  const [x, y] = pos;
  const key = `${x},${y}`;

  if (visited.has(key)) return 0;
  visited.add(key);

  if (cave[y][x] === Block.ROCK) return 0;

  const recur = [0, -1, 1].map((xDir: number) => dfs(cave, [x + xDir, y + 1], result, visited));
  if (recur.some(x => x === -1)) {
    result.counting = false;
    return -1;
  }

  if (cave[y][x] === Block.EMPTY) cave[y][x] = Block.SAND;

  if (result.counting) result.numSandTiles++;

  return 1 + recur.reduce((a: number, b: number) => a + b, 0);
};

// IDEA: when a sand particle's x coordinate gets away from the lines (as in
//       part 1 is out of bounds) there is no need to continue DFS for that
//       area, just add the area of the triangle that will be created by the
//       falling sand particles
const pourSand = (s: string, addFloor: boolean = false) => {
  const { cave, minX, minY } = buildCave(s, addFloor);
  const SPAWN = [SPAWN_POINT[0] - minX, SPAWN_POINT[1] - minY];
  const result = { numSandTiles: 0, counting: true };
  dfs(cave, SPAWN, result);
  return result.numSandTiles;
};

// NOTE: original solution simulated every sand particle falling down (inefficient)
const simulateSand = (s: string, addFloor: boolean = false) => {
  const { cave, minX, minY } = buildCave(s, addFloor);
  const SPAWN = [SPAWN_POINT[0] - minX, SPAWN_POINT[1] - minY];
  const X_DIRS: number[] = [-1, 0, 1];

  let numSandTiles = 0;
  let sand = SPAWN;

  let keepSpawning: boolean = true;
  while (keepSpawning) {
    const [x, y] = sand;

    // can move down
    if (X_DIRS.some(dx => cave[y + 1][x + dx] === Block.EMPTY)) {
      if (cave[y + 1][x] === Block.EMPTY) { // move straight down
        sand = [x, y + 1];
      } else if (cave[y + 1][x - 1] === Block.EMPTY) { // move down left
        sand = [x - 1, y + 1];
      } else if (cave[y + 1][x + 1] === Block.EMPTY) { // move down right
        sand = [x + 1, y + 1];
      }
    }
    // sand has covered the entry point
    else if (sand === SPAWN) {
      numSandTiles++;
      keepSpawning = false;
    }
    // fell out of bounds
    else if (X_DIRS.some(dx => !cave[y + 1][x + dx])) {
      keepSpawning = false;
    }
    // can't move any further down, spawn new sand particle
    else {
      sand = SPAWN;
      cave[y][x] = Block.SAND;
      numSandTiles++;
    }
  }

  return numSandTiles;
};

export const part1 = (s: string): number => pourSand(s);

exports.first = part1;

export const part2 = (s: string): number => pourSand(s, true);

exports.second = part2;
