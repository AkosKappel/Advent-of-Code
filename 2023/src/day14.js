const ROUNDED_ROCK = 'O';
const CUBE_ROCK = '#';
const EMPTY_SPACE = '.';

class Platform {
  constructor(grid) {
    this.grid = grid.split('\n').map((line) => line.split(''));
    this.width = this.grid[0].length;
    this.height = this.grid.length;
  }

  get(x, y) {
    if (0 <= x && x < this.width && 0 <= y && y < this.height) {
      return this.grid[y][x];
    }
    return CUBE_ROCK;
  }

  set(x, y, value) {
    if (0 <= x && x < this.width && 0 <= y && y < this.height) {
      this.grid[y][x] = value;
    }
  }

  cycle(numCycles) {
    for (let i = 0; i < numCycles; i++) {
      this.tiltNorth();
      this.tiltWest();
      this.tiltSouth();
      this.tiltEast();
    }
    return this;
  }

  calculateNorthLoad() {
    return this.grid.reduce((load, row, y) => {
      const numRocksInRow = row.filter(cell => cell === ROUNDED_ROCK).length;
      return load + numRocksInRow * (this.height - y);
    }, 0);
  }

  tiltNorth() {
    const newGrid = this.grid.map(row =>
      row.map(cell => cell === CUBE_ROCK ? CUBE_ROCK : EMPTY_SPACE));

    // move all rounded rocks up north as much as possible
    for (let x = 0; x < this.width; x++) {
      let numMoved = 0;
      for (let y = this.height - 1; y >= -1; y--) {

        if (this.get(x, y) === CUBE_ROCK && numMoved > 0) {
          // move all rounded rocks up until the next cube rock
          for (let i = 0; i < numMoved; i++) {
            newGrid[y + i + 1][x] = ROUNDED_ROCK;
          }
          numMoved = 0;
        }
        if (this.get(x, y) === ROUNDED_ROCK) {
          numMoved++;
        }
      }
    }

    this.grid = newGrid;
    return this;
  }

  tiltSouth() {
    const newGrid = this.grid.map(row =>
      row.map(cell => cell === CUBE_ROCK ? CUBE_ROCK : EMPTY_SPACE));

    for (let x = 0; x < this.width; x++) {
      let numMoved = 0;
      for (let y = 0; y < this.height + 1; y++) {
        if (this.get(x, y) === CUBE_ROCK && numMoved > 0) {
          for (let i = 0; i < numMoved; i++) {
            newGrid[y - i - 1][x] = ROUNDED_ROCK;
          }
          numMoved = 0;
        }
        if (this.get(x, y) === ROUNDED_ROCK) {
          numMoved++;
        }
      }
    }

    this.grid = newGrid;
    return this;
  }

  tiltEast() {
    const newGrid = this.grid.map(row =>
      row.map(cell => cell === CUBE_ROCK ? CUBE_ROCK : EMPTY_SPACE));

    for (let y = 0; y < this.height; y++) {
      let numMoved = 0;
      for (let x = 0; x < this.width + 1; x++) {
        if (this.get(x, y) === CUBE_ROCK && numMoved > 0) {
          for (let i = 0; i < numMoved; i++) {
            newGrid[y][x - i - 1] = ROUNDED_ROCK;
          }
          numMoved = 0;
        }
        if (this.get(x, y) === ROUNDED_ROCK) {
          numMoved++;
        }
      }
    }

    this.grid = newGrid;
    return this;
  }

  tiltWest() {
    const newGrid = this.grid.map(row =>
      row.map(cell => cell === CUBE_ROCK ? CUBE_ROCK : EMPTY_SPACE));

    for (let y = 0; y < this.height; y++) {
      let numMoved = 0;
      for (let x = this.width - 1; x >= -1; x--) {
        if (this.get(x, y) === CUBE_ROCK && numMoved > 0) {
          for (let i = 0; i < numMoved; i++) {
            newGrid[y][x + i + 1] = ROUNDED_ROCK;
          }
          numMoved = 0;
        }
        if (this.get(x, y) === ROUNDED_ROCK) {
          numMoved++;
        }
      }
    }

    this.grid = newGrid;
    return this;
  }

  toString() {
    return this.grid.map(row => row.join('')).join('\n');
  }
}

const part1 = (input) => new Platform(input)
  .tiltNorth()
  .calculateNorthLoad();

const part2 = (input) => new Platform(input)
  .cycle(1_000_000_000)
  .calculateNorthLoad();

module.exports = { part1, part2 };

const example1 = `
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
`.trim();
console.log(part1(example1));
console.log(part2(example1));
