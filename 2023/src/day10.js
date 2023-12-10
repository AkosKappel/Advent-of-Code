const PIPES = {
  NORTH_2_SOUTH: '|',
  EAST_2_WEST: '-',
  NORTH_2_EAST: 'L',
  NORTH_2_WEST: 'J',
  SOUTH_2_EAST: 'F',
  SOUTH_2_WEST: '7',
  GROUND: '.',
  START: 'S',
  INSIDE: 'x',
  OUTSIDE: ' ',
};

class Pipe {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  equals(other) {
    return this.x === other.x && this.y === other.y;
  }

  isVertical() {
    return [
      PIPES.NORTH_2_SOUTH,
      PIPES.NORTH_2_EAST,
      PIPES.NORTH_2_WEST,
      PIPES.SOUTH_2_EAST,
      PIPES.SOUTH_2_WEST,
    ].includes(this.type);
  }
}

class Grid {
  constructor(input) {
    this.grid = input.trim().split('\n')
      .map((row, y) => row.split('')
        .map((type, x) => new Pipe(x, y, type)));
    this.width = this.grid[0].length;
    this.height = this.grid.length;
    this.start = this.grid.reduce((acc, row) => {
      const start = row.find(({ type }) => type === PIPES.START);
      return start || acc;
    }, null);
    this.initStart();
  }

  show(visited = null) {
    console.log(this.grid
      .map(row => row
        .map(pipe => visited && !visited.has(pipe) && pipe.type !== PIPES.INSIDE ? PIPES.OUTSIDE : pipe.type)
        .join('')).join('\n')
      .replaceAll(PIPES.NORTH_2_EAST, '┗')
      .replaceAll(PIPES.NORTH_2_WEST, '┛')
      .replaceAll(PIPES.SOUTH_2_EAST, '┏')
      .replaceAll(PIPES.SOUTH_2_WEST, '┓')
      .replaceAll(PIPES.NORTH_2_SOUTH, '┃')
      .replaceAll(PIPES.EAST_2_WEST, '━'),
    );
  }

  // Perform DFS to walk through the loop once and count the number of steps
  walk() {
    const visited = new Set();
    const stack = [this.start];
    while (stack.length) {
      const pipe = stack.pop();
      if (visited.has(pipe)) continue;
      visited.add(pipe);
      const adjacent = this.getAdjacent(pipe.x, pipe.y);
      stack.push(...adjacent);
    }
    return visited;
  }

  countEnclosed() {
    let count = 0;
    const visited = this.walk();

    for (let y = 0; y < this.height; y++) {
      let prev = null;
      let isInside = false;
      for (let x = 0; x < this.width; x++) {
        const pipe = this.get(x, y);

        if (visited.has(pipe)) {
          if (pipe.isVertical()) {
            if (pipe.type === PIPES.NORTH_2_SOUTH
              || (pipe.type === PIPES.SOUTH_2_WEST && prev === PIPES.NORTH_2_EAST)
              || (pipe.type === PIPES.NORTH_2_WEST && prev === PIPES.SOUTH_2_EAST)
            ) {
              isInside = !isInside;
            }
            prev = pipe.type;
          }

        } else if (isInside) {
          count++;
          pipe.type = PIPES.INSIDE;
        }
      }
    }

    this.show(visited); // visualization
    return count;
  }

  // replace start node with correct pipe type
  initStart() {
    const joinAbove = this.getAdjacent(this.start.x, this.start.y - 1).some(pipe => pipe.equals(this.start));
    const joinBelow = this.getAdjacent(this.start.x, this.start.y + 1).some(pipe => pipe.equals(this.start));
    const joinLeft = this.getAdjacent(this.start.x - 1, this.start.y).some(pipe => pipe.equals(this.start));
    const joinRight = this.getAdjacent(this.start.x + 1, this.start.y).some(pipe => pipe.equals(this.start));
    if (joinAbove && joinBelow) {
      this.start.type = PIPES.NORTH_2_SOUTH;
    } else if (joinLeft && joinRight) {
      this.start.type = PIPES.EAST_2_WEST;
    } else if (joinAbove && joinRight) {
      this.start.type = PIPES.NORTH_2_EAST;
    } else if (joinAbove && joinLeft) {
      this.start.type = PIPES.NORTH_2_WEST;
    } else if (joinBelow && joinRight) {
      this.start.type = PIPES.SOUTH_2_EAST;
    } else if (joinBelow && joinLeft) {
      this.start.type = PIPES.SOUTH_2_WEST;
    } else {
      throw new Error('Invalid start pipe');
    }
  }

  get(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return null;
    return this.grid[y][x];
  }

  getAdjacent(x, y) {
    const pipe = this.get(x, y);
    if (!pipe) return [];
    switch (pipe.type) {
      case PIPES.NORTH_2_SOUTH:
        return [this.get(x, y - 1), this.get(x, y + 1)].filter(Boolean);
      case PIPES.EAST_2_WEST:
        return [this.get(x - 1, y), this.get(x + 1, y)].filter(Boolean);
      case PIPES.NORTH_2_EAST:
        return [this.get(x, y - 1), this.get(x + 1, y)].filter(Boolean);
      case PIPES.NORTH_2_WEST:
        return [this.get(x, y - 1), this.get(x - 1, y)].filter(Boolean);
      case PIPES.SOUTH_2_EAST:
        return [this.get(x, y + 1), this.get(x + 1, y)].filter(Boolean);
      case PIPES.SOUTH_2_WEST:
        return [this.get(x, y + 1), this.get(x - 1, y)].filter(Boolean);
      default:
        return [];
    }
  }
}

const part1 = (input) => new Grid(input).walk().size / 2;

const part2 = (input) => new Grid(input).countEnclosed();

module.exports = { part1, part2 };
