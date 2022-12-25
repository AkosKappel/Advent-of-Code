const BlizzardDir: { [dir: string]: number[] } = {
  '>': [1, 0],
  '<': [-1, 0],
  '^': [0, -1],
  'v': [0, 1],
};

const show = (blizzard: Map<string, number[][]>, width: number, height: number) => {
  console.log(''.padStart(width + 2, '#'));
  for (let y = 0; y < height; y++) {
    let line = '#';
    for (let x = 0; x < width; x++) {
      const key = [x, y].toString();
      if (blizzard.has(key)) {
        const val = blizzard.get(key)!;
        if (val.length === 1) {
          switch (val[0]) {
            case BlizzardDir['>']:
              line += '>';
              break;
            case BlizzardDir['<']:
              line += '<';
              break;
            case BlizzardDir['^']:
              line += '^';
              break;
            case BlizzardDir['v']:
              line += 'v';
              break;
          }
        } else {
          line += val.length.toString();
        }
      } else {
        line += '.';
      }
    }
    console.log(line + '#');
  }
  console.log(''.padStart(width + 2, '#'));
};

const parse = (s: string) => {
  const lines: string[] = s.trim().split('\n');

  const [width, height]: number[] = [lines[0].length - 2, lines.length - 2];
  const start: number[] = [lines[0].indexOf('.') - 1, -1];
  const end: number[] = [lines[lines.length - 1].lastIndexOf('.') - 1, height];

  // [position]: [list of blizzard directions at given position]
  const blizzard = new Map<string, number[][]>();
  const blizzardCells = Object.keys(BlizzardDir);

  lines.forEach((line: string, y: number) => {
    line.split('').forEach((cell: string, x: number) => {
      if (blizzardCells.includes(cell)) {
        blizzard.set([x - 1, y - 1].toString(), [BlizzardDir[cell]]);
      }
    });
  });

  return { width, height, start, end, blizzard };
};

const evolve_blizzard = (blizzard: Map<string, number[][]>, width: number, height: number) => {
  const newBlizzard = new Map<string, number[][]>();

  for (const [pos, dirs] of blizzard.entries()) {
    const [x, y] = pos.split(',').map(Number);
    for (const dir of dirs) {
      const [dx, dy] = dir;
      const nx = (x + dx + width) % width;
      const ny = (y + dy + height) % height;

      const key = [nx, ny].toString();
      if (newBlizzard.has(key)) {
        newBlizzard.get(key)!.push(dir);
      } else {
        newBlizzard.set(key, [dir]);
      }
    }
  }

  return newBlizzard;
};

function* neighbours(blizzard: Map<string, number[][]>, [x, y]: number[], width: number, height: number): IterableIterator<number[]> {
  // handle special positions (the start and end are out of bounds, but are valid position)
  if (x === 0 && y === 0) {
    yield [0, -1];
  } else if (x === width - 1 && y === height - 1) {
    yield [x, height];
  }

  // 4 directions
  for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
    const nx = x + dx;
    const ny = y + dy;

    if (
      0 <= nx && nx < width &&
      0 <= ny && ny < height &&
      !blizzard.has([nx, ny].toString())
    ) {
      yield [nx, ny];
    }
  }

  // stay in place
  if (!blizzard.has([x, y].toString())) {
    yield [x, y];
  }
}

const bfs = (blizzard: Map<string, number[][]>, start: number[], end: number[], width: number, height: number) => {
  let positions = new Set<string>([start.toString()]);
  let time = 0;

  const endKey = end.toString();
  while (!positions.has(endKey)) {
    // advance time and evolve blizzard
    time++;
    blizzard = evolve_blizzard(blizzard, width, height);

    // find all positions that can be reached in the next time step
    const newPositions = new Set<string>();
    for (const pos of positions) {
      const neighs = neighbours(blizzard, pos.split(',').map(Number), width, height);
      for (const neigh of neighs) {
        newPositions.add(neigh.toString());
      }
    }

    // update positions
    positions = newPositions;
  }

  return { time, blizzard };
};

export const part1 = (s: string): number => {
  const { width, height, start, end, blizzard } = parse(s);
  const { time } = bfs(blizzard, start, end, width, height);
  return time;
};

exports.first = part1;

export const part2 = (s: string): number => {
  const { width, height, start, end, blizzard } = parse(s);
  // there
  const { time: time1, blizzard: blizzard1 } = bfs(blizzard, start, end, width, height);
  // back
  const { time: time2, blizzard: blizzard2 } = bfs(blizzard1, end, start, width, height);
  // there again
  const { time: time3, blizzard: blizzard3 } = bfs(blizzard2, start, end, width, height);
  return time1 + time2 + time3;
};

exports.second = part2;
