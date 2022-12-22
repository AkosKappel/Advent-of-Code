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
      const [dx, dy] = [
        facing === Facing.Right ? 1 : facing === Facing.Left ? -1 : 0,
        facing === Facing.Down ? 1 : facing === Facing.Up ? -1 : 0,
      ];

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

export const part2 = (s: string): number => {
  parse(s);
  return 0;
};

exports.second = part2;

import * as day from '../examples/day22.input';

console.time('Time');
console.log(part1(day.input));
console.log(day.answer1);
console.log(part1(day.puzzleInput));
console.log(day.puzzleAnswer1);
// console.log(part2(day.input));
// console.log(day.answer2);
// console.log(part2(day.puzzleInput));
// console.log(day.puzzleAnswer2);
console.timeEnd('Time');
