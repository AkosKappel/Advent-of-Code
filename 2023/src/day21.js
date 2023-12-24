const GARDEN_PLOT = '.';
const ROCK = '#';
const VISITED = 'O';

class Grid {
  constructor(input) {
    this.grid = input.split('\n').map(line => line.split(''));
    this.height = this.grid.length;
    this.width = this.grid[0].length;
    this.steps = 0;

    this.start = this.find('S');
    this.set(...this.start, GARDEN_PLOT);

    this.oddVisited = new Map();
    this.evenVisited = new Map();
    this.evenVisited.set(this.start.join(','), 1);
  }

  step(n = 1) {
    for (let i = 0; i < n; i++) {
      this.stepOnce();
      console.log('Step', this.steps, `(${this.countVisited()} visited)`);
      // console.log(this.toString() + '\n');
    }
    return this;
  }

  stepOnce() {
    const visited = this.steps % 2 === 0 ? this.evenVisited : this.oddVisited;
    const nextVisited = this.steps % 2 === 0 ? this.oddVisited : this.evenVisited;

    for (const key of visited.keys()) {
      const [x, y] = key.split(',').map(Number);
      const neighbors = this.neighbors(x, y);
      for (const [nx, ny] of neighbors) {
        const nkey = `${nx},${ny}`;
        nextVisited.set(nkey, 1);
      }
    }

    this.steps++;
  }

  neighbors(x, y) {
    const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    const neighbors = [];

    for (const [dx, dy] of directions) {
      const nx = (x + dx + this.width) % this.width;
      const ny = (y + dy + this.height) % this.height;
      if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
        if (this.get(nx, ny) !== ROCK) {
          neighbors.push([nx, ny]);
        }
      }
    }

    return neighbors;
  }

  get(x, y) {
    return this.grid[y][x];
  }

  set(x, y, value) {
    this.grid[y][x] = value;
  }

  find(value) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.get(x, y) === value) {
          return [x, y];
        }
      }
    }
    return null;
  }

  countVisited() {
    const visited = this.steps % 2 === 0 ? this.evenVisited : this.oddVisited;
    return [...visited.values()].reduce((a, b) => a + b, 0);
  }

  toString() {
    const grid = this.grid.map(row => row.slice());
    const visited = this.steps % 2 === 0 ? this.evenVisited : this.oddVisited;
    for (const key of visited.keys()) {
      const [x, y] = key.split(',').map(Number);
      grid[y][x] = VISITED;
    }
    return grid.map(row => row.join('')).join('\n');
  }
}

const part1 = (input, numSteps) => new Grid(input).step(numSteps).countVisited();

const part2 = (input, numSteps) => new Grid(input).step(numSteps).countVisited();

module.exports = { part1, part2 };

const example1 = `
...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........
`.trim();
console.log(part1(example1, 50));

// 6 steps => 16 garden plots
// 10 steps => 50 garden plots
// 50 steps => 1594 garden plots
// 100 steps => 6536 garden plots
// 500 steps => 167004 garden plots
// 1000 steps => 668697 garden plots
// 5000 steps => 16733044 garden plots
