enum Tile {
  Empty = '.',
  Wall = '#',
  None = ' ',
  // following tiles are only for visualisation
  Up = '^',
  Down = 'v',
  Left = '<',
  Right = '>',
  Final = 'x',
}

enum Facing {
  Right = 0,
  Down = 1,
  Left = 2,
  Up = 3,
}

const parse = (s: string) => {
  const parsed: string[] = s.split('\n').filter(Boolean);
  const [grid, commands] = [parsed.slice(0, parsed.length - 1), parsed.pop()!];

  // create board
  const [width, height] = [Math.max(...grid.map(s => s.length)), grid.length];
  const board: string[][] = Array.from({ length: height },
    () => Array.from({ length: width },
      () => ' '));
  grid.forEach((row: string, y: number) =>
    row.split('').forEach((cell: string, x: number) =>
      board[y][x] = cell));

  // split instructions like this: '10R2L5' => ['10', 'R', '2', 'L', '5']
  const instructions = commands.match(/(\d+|[RL])/g)!;
  return { board, instructions, width, height };
};

const getForwardMove = (facing: number): number[] => [
  facing === Facing.Right ? 1 : facing === Facing.Left ? -1 : 0,
  facing === Facing.Down ? 1 : facing === Facing.Up ? -1 : 0,
];

const outOfBounds = (x: number, y: number, width: number, height: number) =>
  x < 0 || x >= width || y < 0 || y >= height;

const getPassword = (x: number, y: number, facing: number): number =>
  1000 * (y + 1) + 4 * (x + 1) + facing;

export const part1 = (s: string): number => {
  const { board, instructions, width, height } = parse(s);

  // begin the path in the leftmost open tile of the top row of tiles (facing to the right)
  const start = [board[0].findIndex(c => c === Tile.Empty), 0]; // [x, y]
  let facing = Facing.Right;
  let [x, y] = [...start];

  // create second board for visualisation
  const visualBoard: string[][] = JSON.parse(JSON.stringify(board));
  // display starting position and direction
  visualBoard[y][x] = [Tile.Right, Tile.Down, Tile.Left, Tile.Up][facing];

  for (const ins of instructions) {
    if (ins === 'R') {
      facing = (facing + 1) % 4;
    } else if (ins === 'L') {
      facing = (facing + 3) % 4;
    } else {
      const [dx, dy] = getForwardMove(facing);

      // move forward the given number of steps
      moving: for (let i = 0; i < +ins; i++) {
        let [nx, ny] = [x + dx, y + dy];

        // if you move out of bounds or onto a None tile,
        // wrap around to the other side like on a torus
        if (outOfBounds(nx, ny, width, height) || board[ny][nx] === Tile.None) {
          // wrap around to the first Empty tile
          switch (facing) {
            case Facing.Right:
              const firstWallX = board[ny].indexOf(Tile.Wall);
              const firstEmptyX = board[ny].indexOf(Tile.Empty);
              // move only if the first Empty tile is sooner than the first Wall tile
              // (applies to all 4 cases)
              if (firstEmptyX !== -1 && firstEmptyX < firstWallX) nx = firstEmptyX;
              // else stop moving, because by wrapping around we would hit a Wall tile
              else break moving;
              break;
            case Facing.Left:
              const lastWallX = board[ny].lastIndexOf(Tile.Wall);
              const lastEmptyX = board[ny].lastIndexOf(Tile.Empty);
              if (lastEmptyX !== -1 && lastEmptyX > lastWallX) nx = lastEmptyX;
              else break moving;
              break;
            case Facing.Down:
              const column = board.map(row => row[nx]);
              const firstWallY = column.indexOf(Tile.Wall);
              const firstEmptyY = column.indexOf(Tile.Empty);
              if (firstEmptyY !== -1 && firstEmptyY < firstWallY) ny = firstEmptyY;
              else break moving;
              break;
            case Facing.Up:
              const col = board.map(row => row[nx]);
              const lastWallY = col.lastIndexOf(Tile.Wall);
              const lastEmptyY = col.lastIndexOf(Tile.Empty);
              if (lastEmptyY !== -1 && lastEmptyY > lastWallY) ny = lastEmptyY;
              else break moving;
              break;
          }
        }

        // if you hit a Wall tile, stop moving
        else if (board[ny][nx] === Tile.Wall) break;

        // update position
        [x, y] = [nx, ny];

        // display position and direction on the visualisation board
        visualBoard[y][x] = [Tile.Right, Tile.Down, Tile.Left, Tile.Up][facing];
      }
    }

    // visualise position and facing
    visualBoard[y][x] = [Tile.Right, Tile.Down, Tile.Left, Tile.Up][facing];
  }
  visualBoard[y][x] = Tile.Final;

  // console.log(visualBoard.map(row => row.join('')).join('\n'));
  return getPassword(x, y, facing);
};

exports.first = part1;

const hash = (nums: number[]) => nums.join(',');

// Hardcoded mapping of the cube's net to 3D transitions
//   Example Input Net    Puzzle Input Net
//         ..1.                .12
//         234.                .3.
//         ..56                45.
//                             6..
const getCubeNetMapping = (net: string[][]): Map<string, number[]> => {
  // calculate length of an edge of the cube as the square-root of number of tiles divided by 6 sides
  const edgeLength = Math.sqrt(net.flat().filter(c => c !== Tile.None).length / 6);
  const mapping = new Map<string, number[]>();

  if (edgeLength === 4) { // example input
    // coordinates of left top tile of each face
    //
    // Faces: ..1.
    //        234.
    //        ..56
    const [x1, y1] = [2 * edgeLength, 0];
    const [x2, y2] = [0, edgeLength];
    const [x3, y3] = [edgeLength, edgeLength];
    const [x4, y4] = [2 * edgeLength, edgeLength];
    const [x5, y5] = [2 * edgeLength, 2 * edgeLength];
    const [x6, y6] = [3 * edgeLength, 2 * edgeLength];

    // map top side of tile 1 to top side of tile 2
    for (let i = 0; i < edgeLength; i++) {
      const [x, y] = [x1 + i, y1];
      const [nx, ny] = [x2 + edgeLength - 1 - i, y2];
      mapping.set(hash([x, y, Facing.Up]), [nx, ny, Facing.Down]);
      mapping.set(hash([nx, ny, Facing.Up]), [x, y, Facing.Down]);
    }

    // map right side of tile 1 to right side of tile 6
    for (let i = 0; i < edgeLength; i++) {
      const [x, y] = [x1 + edgeLength - 1, y1 + i];
      const [nx, ny] = [x6 + edgeLength - 1, y6 + edgeLength - 1 - i];
      mapping.set(hash([x, y, Facing.Right]), [nx, ny, Facing.Left]);
      mapping.set(hash([nx, ny, Facing.Right]), [x, y, Facing.Left]);
    }

    // map right side of tile 4 to top side of tile 6
    for (let i = 0; i < edgeLength; i++) {
      const [x, y] = [x4 + edgeLength - 1, y4 + i];
      const [nx, ny] = [x6 + edgeLength - 1 - i, y6];
      mapping.set(hash([x, y, Facing.Right]), [nx, ny, Facing.Down]);
      mapping.set(hash([nx, ny, Facing.Up]), [x, y, Facing.Left]);
    }

    // map bottom side of tile 6 to left side of tile 2
    for (let i = 0; i < edgeLength; i++) {
      const [x, y] = [x6 + edgeLength - 1 - i, y6 + edgeLength - 1];
      const [nx, ny] = [x2, y2 + i];
      mapping.set(hash([x, y, Facing.Down]), [nx, ny, Facing.Right]);
      mapping.set(hash([nx, ny, Facing.Left]), [x, y, Facing.Up]);
    }

    // map bottom side of tile 5 to bottom side of tile 2
    for (let i = 0; i < edgeLength; i++) {
      const [x, y] = [x5 + i, y5 + edgeLength - 1];
      const [nx, ny] = [x2 + edgeLength - 1 - i, y2 + edgeLength - 1];
      mapping.set(hash([x, y, Facing.Down]), [nx, ny, Facing.Up]);
      mapping.set(hash([nx, ny, Facing.Down]), [x, y, Facing.Up]);
    }

    // map left side of tile 5 to bottom side of tile 3
    for (let i = 0; i < edgeLength; i++) {
      const [x, y] = [x5, y5 + i];
      const [nx, ny] = [x3 + edgeLength - 1 - i, y3 + edgeLength - 1];
      mapping.set(hash([x, y, Facing.Left]), [nx, ny, Facing.Up]);
      mapping.set(hash([nx, ny, Facing.Down]), [x, y, Facing.Right]);
    }

    // map top side of tile 3 to left side of tile 1
    for (let i = 0; i < edgeLength; i++) {
      const [x, y] = [x3 + i, y3];
      const [nx, ny] = [x1, y1 + i];
      mapping.set(hash([x, y, Facing.Up]), [nx, ny, Facing.Right]);
      mapping.set(hash([nx, ny, Facing.Left]), [x, y, Facing.Down]);
    }
  } else if (edgeLength === 50) { // puzzle input
    // coordinates of left top tile of each face
    //
    // Faces: .12
    //        .3.
    //        45.
    //        6..
    const [x1, y1] = [edgeLength, 0];
    const [x2, y2] = [2 * edgeLength, 0];
    const [x3, y3] = [edgeLength, edgeLength];
    const [x4, y4] = [0, 2 * edgeLength];
    const [x5, y5] = [edgeLength, 2 * edgeLength];
    const [x6, y6] = [0, 3 * edgeLength];

    // map top side of tile 1 to left side of tile 6
    for (let i = 0; i < edgeLength; i++) {
      const [x, y] = [x1 + i, y1];
      const [nx, ny] = [x6, y6 + i];
      mapping.set(hash([x, y, Facing.Up]), [nx, ny, Facing.Right]);
      mapping.set(hash([nx, ny, Facing.Left]), [x, y, Facing.Down]);
    }

    // map top side of tile 2 to bottom side of tile 6
    for (let i = 0; i < edgeLength; i++) {
      const [x, y] = [x2 + i, y2];
      const [nx, ny] = [x6 + i, y6 + edgeLength - 1];
      mapping.set(hash([x, y, Facing.Up]), [nx, ny, Facing.Up]);
      mapping.set(hash([nx, ny, Facing.Down]), [x, y, Facing.Down]);
    }

    // map right side of tile 2 to right side of tile 5
    for (let i = 0; i < edgeLength; i++) {
      const [x, y] = [x2 + edgeLength - 1, y2 + i];
      const [nx, ny] = [x5 + edgeLength - 1, y5 + edgeLength - 1 - i];
      mapping.set(hash([x, y, Facing.Right]), [nx, ny, Facing.Left]);
      mapping.set(hash([nx, ny, Facing.Right]), [x, y, Facing.Left]);
    }

    // map bottom side of tile 2 to right side of tile 3
    for (let i = 0; i < edgeLength; i++) {
      const [x, y] = [x2 + i, y2 + edgeLength - 1];
      const [nx, ny] = [x3 + edgeLength - 1, y3 + i];
      mapping.set(hash([x, y, Facing.Down]), [nx, ny, Facing.Left]);
      mapping.set(hash([nx, ny, Facing.Right]), [x, y, Facing.Up]);
    }

    // map bottom side of tile 5 to right side of tile 6
    for (let i = 0; i < edgeLength; i++) {
      const [x, y] = [x5 + i, y5 + edgeLength - 1];
      const [nx, ny] = [x6 + edgeLength - 1, y6 + i];
      mapping.set(hash([x, y, Facing.Down]), [nx, ny, Facing.Left]);
      mapping.set(hash([nx, ny, Facing.Right]), [x, y, Facing.Up]);
    }

    // map left side of tile 4 to left side of tile 1
    for (let i = 0; i < edgeLength; i++) {
      const [x, y] = [x4, y4 + i];
      const [nx, ny] = [x1, y1 + edgeLength - 1 - i];
      mapping.set(hash([x, y, Facing.Left]), [nx, ny, Facing.Right]);
      mapping.set(hash([nx, ny, Facing.Left]), [x, y, Facing.Right]);
    }

    // map top side of tile 4 to left side of tile 3
    for (let i = 0; i < edgeLength; i++) {
      const [x, y] = [x4 + i, y4];
      const [nx, ny] = [x3, y3 + i];
      mapping.set(hash([x, y, Facing.Up]), [nx, ny, Facing.Right]);
      mapping.set(hash([nx, ny, Facing.Left]), [x, y, Facing.Down]);
    }
  }

  // console.log('faces', faces);
  // console.log('mapping', mapping);
  // console.log('mapping size', mapping.size);

  return mapping;
};

export const part2 = (s: string): number => {
  // board is a flattened cube
  const { board, instructions } = parse(s);

  // begin the path in the leftmost open tile of the top row of tiles (facing to the right)
  const start = [board[0].findIndex(c => c === Tile.Empty), 0]; // [x, y]
  let facing = Facing.Right;
  let [x, y] = [...start];

  const mapping: Map<string, number[]> = getCubeNetMapping(board);

  // create second board for visualisation
  const visualBoard: string[][] = JSON.parse(JSON.stringify(board));
  // display starting position and direction
  visualBoard[y][x] = [Tile.Right, Tile.Down, Tile.Left, Tile.Up][facing];

  for (const ins of instructions) {
    if (ins === 'R') {
      facing = (facing + 1) % 4;
    } else if (ins === 'L') {
      facing = (facing + 3) % 4;
    } else {
      let [dx, dy]: number[] = getForwardMove(facing);

      // move forward the given number of steps
      for (let i = 0; i < +ins; i++) {
        let [nx, ny]: number[] = [x + dx, y + dy];

        // if you are crossing the edge of the cube, apply pre-calculated mapping
        if (mapping.has(hash([x, y, facing]))) {
          let tmpFacing; // don't change facing until after we know the new position doesn't contain a wall
          [nx, ny, tmpFacing] = mapping.get(hash([x, y, facing]))!;
          if (board[ny][nx] === Tile.Wall) break;
          facing = tmpFacing;
          [dx, dy] = getForwardMove(facing);
        }
        // if you hit the wall, stop moving
        else if (board[ny][nx] === Tile.Wall) break;

        // update position
        [x, y] = [nx, ny];

        // display position and direction on the visualisation board
        visualBoard[y][x] = [Tile.Right, Tile.Down, Tile.Left, Tile.Up][facing];
      }
    }
    // visualise position and facing
    visualBoard[y][x] = [Tile.Right, Tile.Down, Tile.Left, Tile.Up][facing];
  }
  visualBoard[y][x] = Tile.Final;

  // console.log(visualBoard.map(row => row.join('')).join('\n'));
  return getPassword(x, y, facing);
};

exports.second = part2;
