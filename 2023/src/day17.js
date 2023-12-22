class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(element, priority) {
    const newItem = { element, priority };
    this.items.push(newItem);
    this.bubbleUp(this.items.length - 1);
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.items[index].priority < this.items[parentIndex].priority) {
        [this.items[index], this.items[parentIndex]] = [this.items[parentIndex], this.items[index]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  dequeue() {
    if (this.items.length === 0) return null;
    if (this.items.length === 1) return this.items.pop();

    const min = this.items[0];
    this.items[0] = this.items.pop();
    this.sinkDown(0);
    return min;
  }

  sinkDown(index) {
    let sinking = true;
    while (sinking) {
      const leftChildIdx = 2 * index + 1;
      const rightChildIdx = 2 * index + 2;
      let smallestIdx = index;

      if (leftChildIdx < this.items.length && this.items[leftChildIdx].priority < this.items[smallestIdx].priority) {
        smallestIdx = leftChildIdx;
      }

      if (rightChildIdx < this.items.length && this.items[rightChildIdx].priority < this.items[smallestIdx].priority) {
        smallestIdx = rightChildIdx;
      }

      if (smallestIdx !== index) {
        [this.items[index], this.items[smallestIdx]] = [this.items[smallestIdx], this.items[index]];
        index = smallestIdx;
      } else {
        sinking = false;
      }
    }
  }

  isEmpty() {
    return this.items.length === 0;
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

  queue.enqueue(new Crucible(start.x, start.y, 0, 1, 0), 0);
  queue.enqueue(new Crucible(start.x, start.y, 1, 0, 0), 0);

  while (!queue.isEmpty()) {
    const { element: current, priority: heatLoss } = queue.dequeue();

    if (current.x === end.x && current.y === end.y && current.straight >= minStraight) {
      return heatLoss;
    }

    for (const neighbor of current.getNeighbors(minStraight, maxStraight)) {
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
