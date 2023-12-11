class Cell {
  constructor(type, size = 1) {
    this.type = type;
    this.size = size;
  }

  isEmpty() {
    return this.type === '.';
  }

  isGalaxy() {
    return this.type === '#';
  }

  toString() {
    return this.type + `(${this.size}) `;
  }
}

const parse = (input) => input
  .split('\n')
  .map(row => row.split('').map(char => new Cell(char)));

const transpose = (matrix) => matrix[0].map((col, i) => matrix.map(row => row[i]));

const expandUniverse = (universe, factor) => {
  universe.forEach((row, rowIndex) => {
    if (row.every(cell => cell.isEmpty())) {
      universe[rowIndex].forEach(cell => cell.size = factor);
    }
  });

  universe = transpose(universe);
  universe.forEach((col, colIndex) => {
    if (col.every(cell => cell.isEmpty())) {
      universe[colIndex].forEach(cell => cell.size = factor);
    }
  });
  universe = transpose(universe);

  return universe;
};

const countDistances = (input, expansionFactor = 2) => {
  const universe = expandUniverse(parse(input), expansionFactor);

  const galaxies = universe
    .flatMap((row, y) => row
      .map((cell, x) => cell.isGalaxy() ? { x, y } : null))
    .filter(Boolean);

  const distances = galaxies.flatMap((galaxy1, i) => galaxies
    .slice(i + 1).map((galaxy2, j) => {
      let distance = 0;

      const minX = Math.min(galaxy1.x, galaxy2.x);
      const maxX = Math.max(galaxy1.x, galaxy2.x);
      for (let x = minX; x < maxX; x++) {
        distance += universe[galaxy1.y][x].size;
      }

      const minY = Math.min(galaxy1.y, galaxy2.y);
      const maxY = Math.max(galaxy1.y, galaxy2.y);
      for (let y = minY; y < maxY; y++) {
        distance += universe[y][galaxy1.x].size;
      }
      return { i, j: j + i + 1, distance };
    }));

  return distances.reduce((acc, { distance }) => acc + distance, 0);
};

const part1 = (input) => countDistances(input);


const part2 = (input) => countDistances(input, 1_000_000);

module.exports = { part1, part2 };
