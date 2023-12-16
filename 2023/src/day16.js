const Direction = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3,
};

const Tile = {
  VERTICAL: '|',
  HORIZONTAL: '-',
  EMPTY: '.',
  SLASH: '/',
  BACKSLASH: '\\',
  VISITED: '#',
  VISITED_UP: '^',
  VISITED_RIGHT: '>',
  VISITED_DOWN: 'v',
  VISITED_LEFT: '<',
};

class Contraption {
  constructor(input) {
    this.grid = input.split('\n').map(line => line.split(''));
    this.height = this.grid.length;
    this.width = this.grid[0].length;
    this.visited = new Set();
  }

  bfs(start) {
    const visited = new Set();
    const queue = [start];
    visited.add(`${start.x},${start.y},${start.dir}`);

    while (queue.length > 0) {
      const { x, y, dir } = queue.shift();
      const nextTiles = this.getNextTiles(x, y, dir);

      for (const nextTile of nextTiles) {
        const key = `${nextTile.x},${nextTile.y},${nextTile.dir}`;
        if (!visited.has(key)) {
          queue.push(nextTile);
          visited.add(key);
        }
      }
    }

    this.visited = visited;
    return this;
  }

  getTile(x, y) {
    if (0 <= x && x < this.width && 0 <= y && y < this.height) {
      return this.grid[y][x];
    }
    return null;
  }

  getNextTiles(x, y, direction) {
    const tile = this.getTile(x, y);
    if (tile === null) return [];

    const tiles = [];
    switch (tile) {
      case Tile.EMPTY:
        switch (direction) {
          case Direction.UP:
            if (this.getTile(x, y - 1))
              tiles.push({ x, y: y - 1, dir: Direction.UP });
            break;
          case Direction.RIGHT:
            if (this.getTile(x + 1, y))
              tiles.push({ x: x + 1, y, dir: Direction.RIGHT });
            break;
          case Direction.DOWN:
            if (this.getTile(x, y + 1))
              tiles.push({ x, y: y + 1, dir: Direction.DOWN });
            break;
          case Direction.LEFT:
            if (this.getTile(x - 1, y))
              tiles.push({ x: x - 1, y, dir: Direction.LEFT });
            break;
        }
        break;
      case Tile.VERTICAL:
        switch (direction) {
          case Direction.RIGHT:
          case Direction.LEFT:
            if (this.getTile(x, y - 1))
              tiles.push({ x, y: y - 1, dir: Direction.UP });
            if (this.getTile(x, y + 1))
              tiles.push({ x, y: y + 1, dir: Direction.DOWN });
            break;
          case Direction.UP:
            if (this.getTile(x, y - 1))
              tiles.push({ x, y: y - 1, dir: Direction.UP });
            break;
          case Direction.DOWN:
            if (this.getTile(x, y + 1))
              tiles.push({ x, y: y + 1, dir: Direction.DOWN });
            break;
        }
        break;
      case Tile.HORIZONTAL:
        switch (direction) {
          case Direction.UP:
          case Direction.DOWN:
            if (this.getTile(x - 1, y))
              tiles.push({ x: x - 1, y, dir: Direction.LEFT });
            if (this.getTile(x + 1, y))
              tiles.push({ x: x + 1, y, dir: Direction.RIGHT });
            break;
          case Direction.RIGHT:
            if (this.getTile(x + 1, y))
              tiles.push({ x: x + 1, y, dir: Direction.RIGHT });
            break;
          case Direction.LEFT:
            if (this.getTile(x - 1, y))
              tiles.push({ x: x - 1, y, dir: Direction.LEFT });
            break;
        }
        break;
      case Tile.SLASH:
        switch (direction) {
          case Direction.UP:
            if (this.getTile(x + 1, y))
              tiles.push({ x: x + 1, y, dir: Direction.RIGHT });
            break;
          case Direction.RIGHT:
            if (this.getTile(x, y - 1))
              tiles.push({ x, y: y - 1, dir: Direction.UP });
            break;
          case Direction.DOWN:
            if (this.getTile(x - 1, y))
              tiles.push({ x: x - 1, y, dir: Direction.LEFT });
            break;
          case Direction.LEFT:
            if (this.getTile(x, y + 1))
              tiles.push({ x, y: y + 1, dir: Direction.DOWN });
            break;
        }
        break;
      case Tile.BACKSLASH:
        switch (direction) {
          case Direction.UP:
            if (this.getTile(x - 1, y))
              tiles.push({ x: x - 1, y, dir: Direction.LEFT });
            break;
          case Direction.RIGHT:
            if (this.getTile(x, y + 1))
              tiles.push({ x, y: y + 1, dir: Direction.DOWN });
            break;
          case Direction.DOWN:
            if (this.getTile(x + 1, y))
              tiles.push({ x: x + 1, y, dir: Direction.RIGHT });
            break;
          case Direction.LEFT:
            if (this.getTile(x, y - 1))
              tiles.push({ x, y: y - 1, dir: Direction.UP });
            break;
        }
        break;
    }

    return tiles.filter(tile => tile !== null);
  }

  countVisited() {
    return new Set(Array.from(this.visited).map(key => key.split(',').slice(0, 2).join(','))).size;
  }

  showVisited(withDirection = false) {
    const visited = Array.from(this.visited).map(key => key.split(',').map(Number));
    const grid = this.grid.map(line => line.map(_ => Tile.EMPTY));
    for (const [x, y, dir] of visited) {
      if (!withDirection) {
        grid[y][x] = Tile.VISITED;
        continue;
      }
      switch (dir) {
        case Direction.UP:
          grid[y][x] = Tile.VISITED_UP;
          break;
        case Direction.RIGHT:
          grid[y][x] = Tile.VISITED_RIGHT;
          break;
        case Direction.DOWN:
          grid[y][x] = Tile.VISITED_DOWN;
          break;
        case Direction.LEFT:
          grid[y][x] = Tile.VISITED_LEFT;
          break;
      }
    }
    return grid.map(line => line.join('')).join('\n');
  }

  toString() {
    return this.grid.map(line => line.join('')).join('\n');
  }
}

const part1 = (input) => new Contraption(input)
  .bfs({ x: 0, y: 0, dir: Direction.RIGHT })
  .countVisited();

const part2 = (input) => {
  const contraption = new Contraption(input);
  let maxVisited = 0;

  // Start from every tile on top row heading down
  for (let x = 0; x < contraption.width; x++) {
    contraption.bfs({ x, y: 0, dir: Direction.DOWN });
    maxVisited = Math.max(maxVisited, contraption.countVisited());
  }

  // Start from every tile on right column heading left
  for (let y = 0; y < contraption.height; y++) {
    contraption.bfs({ x: contraption.width - 1, y, dir: Direction.LEFT });
    maxVisited = Math.max(maxVisited, contraption.countVisited());
  }

  // Start from every tile on bottom row heading up
  for (let x = 0; x < contraption.width; x++) {
    contraption.bfs({ x, y: contraption.height - 1, dir: Direction.UP });
    maxVisited = Math.max(maxVisited, contraption.countVisited());
  }

  // Start from every tile on left column heading right
  for (let y = 0; y < contraption.height; y++) {
    contraption.bfs({ x: 0, y, dir: Direction.RIGHT });
    maxVisited = Math.max(maxVisited, contraption.countVisited());
  }

  return maxVisited;
};

module.exports = { part1, part2 };
