const GARDEN_PLOT = '.';
const ROCK = '#';
const START = 'S';

const DIRECTIONS = [ // [x, y]
  [1, 0], // right
  [0, 1], // down
  [-1, 0], // left
  [0, -1], // up
];

const encode = (values) => values.join(',');
const decode = str => str.split(',').map(Number);

const mod = (n, m) => ((n % m) + m) % m;
const diffs = values => values.map((value, i) => value - values[i - 1]).slice(1);
const run = array => array.map(values => {
  while (values.some(value => value !== 0)) {
    values = diffs(values);
    array.push(values);
  }
  return array.map(values => values[0]);
});

class Grid {
  constructor(input) {
    this.tiles = input.split('\n').map(line => line.trim().split(''));
    this.height = this.tiles.length;
    this.width = this.tiles[0].length;

    const startRow = this.tiles.findIndex(row => row.includes(START));
    const startCol = this.tiles[startRow].findIndex(col => col === START);
    this.start = [startCol, startRow];
    this.positions = new Set([encode(this.start)]);
  }

  step(times) {
    for (let i = 0; i < times; i++) {
      this.stepOnce();
    }
    return this;
  }

  stepOnce() {
    this.positions = new Set([...this.neighbors(this.positions)]);
  }

  *neighbors() {
    for (const position of this.positions) {
      const [x, y] = decode(position)

      for (const [dx, dy] of DIRECTIONS) {
        const nextX = x + dx;
        const nextY = y + dy;
        const tile = this.tiles[mod(nextY, this.height)][mod(nextX, this.width)];
        if (tile === ROCK) continue;
        yield encode([nextX, nextY]);
      }
    }
  }

  interpolate(n) {
    if (n < 200) return this.step(n).positions.size;

    const counts = [];

    this.step(65);
    counts.push(this.positions.size);

    for (let k = 0; k < 2; k++) {
      this.step(131);
      counts.push(this.positions.size);
    }

    const coefficients = run([counts])[0];
    const [a, b, c,] = coefficients;

    const steps = (n - 65) / 131;
    return a + b * steps + c / 2 * steps * (steps - 1);
  }
}

const part1 = (input, numSteps) => new Grid(input).step(numSteps).positions.size;

const part2 = (input, numSteps) => new Grid(input).interpolate(numSteps)

module.exports = { part1, part2 };
