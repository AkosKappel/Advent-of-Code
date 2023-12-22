const Direction = {
  RIGHT: [1, 0],
  DOWN: [0, 1],
  LEFT: [-1, 0],
  UP: [0, -1],
};

class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(item, priority) {
    this.queue.push({ item, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

class Crucible {
  constructor(x, y, dx, dy, straight) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.straight = straight;
  }

  get key() {
    return `${this.x},${this.y},${this.dx},${this.dy},${this.straight}`;
  }

  * getNeighbors(minStraight, maxStraight) {
    if (this.straight < maxStraight) {
      // go straight
      yield new Crucible(this.x + this.dx, this.y + this.dy, this.dx, this.dy, this.straight + 1);
    }

    if (this.straight >= minStraight) {
      // turn left and right by 90 degrees
      yield new Crucible(this.x + this.dy, this.y - this.dx, this.dy, -this.dx, 1);
      yield new Crucible(this.x - this.dy, this.y + this.dx, -this.dy, this.dx, 1);
    }
  }
}

const minimizeHeatLoss = (input, minStraight, maxStraight) => {
  const grid = input.split('\n').map(line => line.split('').map(c => +c));
  const height = grid.length;
  const width = grid[0].length;
  const start = { x: 0, y: 0 };
  const end = { x: width - 1, y: height - 1 };

  const visited = new Set();
  const queue = new PriorityQueue();

  queue.enqueue(new Crucible(start.x, start.y, ...Direction.DOWN, 0), 0);
  queue.enqueue(new Crucible(start.x, start.y, ...Direction.RIGHT, 0), 0);

  while (!queue.isEmpty()) {
    const { item: crucible, priority: heatLoss } = queue.dequeue();

    if (crucible.x === end.x && crucible.y === end.y && crucible.straight >= minStraight) {
      return heatLoss;
    }

    for (const neighbor of crucible.getNeighbors(minStraight, maxStraight)) {
      if (neighbor.x < 0 || neighbor.x >= width || neighbor.y < 0 || neighbor.y >= height) {
        continue;
      }
      if (!visited.has(neighbor.key)) {
        visited.add(neighbor.key);
        queue.enqueue(neighbor, heatLoss + grid[neighbor.y][neighbor.x]);
      }
    }
  }

  return Infinity;
};

const part1 = (input) => minimizeHeatLoss(input, 0, 3);

const part2 = (input) => minimizeHeatLoss(input, 4, 10);

module.exports = { part1, part2 };
