const Dir: { [dir: string]: number[] } = { // [x, y]
  N: [0, -1],   // North
  S: [0, 1],    // South
  E: [1, 0],    // East
  W: [-1, 0],   // West
  NE: [1, -1],  // North East
  NW: [-1, -1], // North West
  SE: [1, 1],   // South East
  SW: [-1, 1],  // South West
};

// 'check' is a list of directions to check if they are empty,
// so that 'move' can be applied to the current position
const MOVEMENT_RULES = [
  { check: [Dir.N, Dir.NE, Dir.NW], move: Dir.N },
  { check: [Dir.S, Dir.SE, Dir.SW], move: Dir.S },
  { check: [Dir.W, Dir.NW, Dir.SW], move: Dir.W },
  { check: [Dir.E, Dir.NE, Dir.SE], move: Dir.E },
];

// get set of '#' tile coordinates
const parse = (s: string): Set<string> => new Set(s
  .trim()
  .split('\n')
  .map((row: string, y: number) => row
    .split('')
    .map((tile: string, x: number) => tile === '#' ? `${x},${y}` : '')
    .filter(coords => coords))
  .flat());

// enclose the elves in AABB (Axis Aligned Bounding Box)
const boundingBox = (points: number[][]) => points
  .reduce(([left, top, right, bottom], [x, y]) => [
    Math.min(left, x), Math.min(top, y), Math.max(right, x), Math.max(bottom, y),
  ], [Infinity, Infinity, -Infinity, -Infinity]);

const displayTerrain = (elves: Set<string>): string => {
  const points = Array.from(elves).map(coords => coords.split(',').map(Number));
  const [minX, minY, maxX, maxY] = boundingBox(points);
  const terrain = Array.from({ length: maxY - minY + 1 },
    () => Array.from({ length: maxX - minX + 1 },
      () => '.'));
  points.forEach(([x, y]: number[]) => terrain[y - minY][x - minX] = '#');
  return terrain.map(row => row.join('')).join('\n');
};

export const part1 = (s: string): number => {
  const NUM_ROUNDS: number = 10;
  let elves = parse(s);

  for (let i = 0; i < NUM_ROUNDS; i++) {
    // [target position]: [list of elves that will move there]
    const movesToMake: Map<string, string[]> = new Map();
    // elves that can't move
    const stayingElves: Set<string> = new Set();

    for (const elf of elves) {
      const [x, y] = elf.split(',').map(Number);

      // if no other elf is next to this elf, it can't move
      if (Object.values(Dir).every(([dx, dy]) => !elves.has(`${x + dx},${y + dy}`))) {
        stayingElves.add(elf);
        continue;
      }

      let canMove: boolean = false;

      for (let j = 0; j < MOVEMENT_RULES.length; j++) {
        const { check, move } = MOVEMENT_RULES[(i + j) % MOVEMENT_RULES.length];

        // if at least one of the check positions is empty, apply the rule's move
        if (check.every(([dx, dy]: number[]) => !elves.has(`${x + dx},${y + dy}`))) {
          canMove = true;

          // create intended move
          const [moveX, moveY] = move;
          const target = `${x + moveX},${y + moveY}`;

          // save the intended move
          if (movesToMake.has(target)) {
            movesToMake.get(target)!.push(elf);
          } else {
            movesToMake.set(target, [elf]);
          }

          // stop checking rules
          break;
        }
      }

      if (!canMove) {
        stayingElves.add(elf);
      }
    }

    elves = stayingElves;

    // apply only the moves, where only one elf will move to the target position
    movesToMake.forEach((movingElves: string[], target: string) => {
      if (movingElves.length === 1) {
        elves.add(target);
      } else {
        movingElves.forEach(elf => elves.add(elf));
      }
    });
  }

  // count empty tiles
  return displayTerrain(elves).split('').filter(tile => tile === '.').length;
};

exports.first = part1;

export const part2 = (s: string): number => {
  const elves = parse(s);
  // elves that can't move
  const stayingElves: Set<string> = new Set();

  let numRounds = 0;
  while (stayingElves.size !== elves.size) {
    stayingElves.clear();

    // [target position]: [list of elves that will move there]
    const movesToMake: Map<string, string[]> = new Map();

    for (const elf of elves) {
      const [x, y] = elf.split(',').map(Number);

      // if no other elf is next to this elf, it can't move
      if (Object.values(Dir).every(([dx, dy]) => !elves.has(`${x + dx},${y + dy}`))) {
        stayingElves.add(elf);
        continue;
      }

      let canMove: boolean = false;

      for (let j = 0; j < MOVEMENT_RULES.length; j++) {
        const { check, move } = MOVEMENT_RULES[(numRounds + j) % MOVEMENT_RULES.length];

        // if at least one of the check positions is empty, apply the rule's move
        if (check.every(([dx, dy]: number[]) => !elves.has(`${x + dx},${y + dy}`))) {
          canMove = true;

          // create intended move
          const [moveX, moveY] = move;
          const target = `${x + moveX},${y + moveY}`;

          // save the intended move
          if (movesToMake.has(target)) {
            movesToMake.get(target)!.push(elf);
          } else {
            movesToMake.set(target, [elf]);
          }

          // stop checking rules
          break;
        }
      }

      if (!canMove) {
        stayingElves.add(elf);
      }
    }

    elves.clear();
    stayingElves.forEach(elf => elves.add(elf));

    // apply only the moves, where only one elf will move to the target position
    movesToMake.forEach((movingElves: string[], target: string) => {
      if (movingElves.length === 1) {
        elves.add(target);
      } else {
        movingElves.forEach(elf => elves.add(elf));
      }
    });

    numRounds++;
  }

  return numRounds;
};

exports.second = part2;
