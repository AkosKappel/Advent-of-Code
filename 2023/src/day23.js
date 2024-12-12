const PATH = '.';
const FOREST = '#';
const SLOPES = ['^', '>', 'v', '<'];

const DIRECTION = {
  UP: [0, -1],
  RIGHT: [1, 0],
  DOWN: [0, 1],
  LEFT: [-1, 0],
  ALL: [[0, -1], [1, 0], [0, 1], [-1, 0]],
  fromSymbol(symbol) {
    switch (symbol) {
      case SLOPES[0]:
        return [DIRECTION.UP];
      case SLOPES[1]:
        return [DIRECTION.RIGHT];
      case SLOPES[2]:
        return [DIRECTION.DOWN];
      case SLOPES[3]:
        return [DIRECTION.LEFT];
      case PATH:
        return DIRECTION.ALL;
      case FOREST:
        return [];
      default:
        throw new Error(`Unknown direction symbol: ${symbol}`);
    }
  },
};

const parse = (input) => {
  const map = new Map();
  input.split('\n').forEach((line, y) => {
    line.split('').forEach((char, x) => {
      map.set(`${x},${y}`, char);
    });
  });
  return map;
};

const isFree = (map, pos) => map.has(pos) && map.get(pos) !== FOREST;

const isRoad = (map, pos) => {
  const [x, y] = pos.split(',').map(Number);
  return isFree(map, `${x},${y}`) && DIRECTION.ALL
    .filter(([dx, dy]) => isFree(map, `${x + dx},${y + dy}`))
    .length === 2;
};

const getDistance = (map, pos1, pos2) => {
  const queue = [[pos1, 0]];
  const visited = new Set([pos1]);

  while (queue.length) {
    const [pos, distance] = queue.shift();
    const [x, y] = pos.split(',').map(Number);

    for (const [dx, dy] of DIRECTION.fromSymbol(map.get(pos))) {
      const nextPos = `${x + dx},${y + dy}`;
      if (nextPos === pos2) {
        return distance + 1;
      }
      if (isRoad(map, nextPos) && !visited.has(nextPos)) {
        visited.add(nextPos);
        queue.push([nextPos, distance + 1]);
      }
    }
  }

  return -1;
};

const buildGraph = (map) => {
  // start node is first and end node is last
  const nodePos = Array.from(map.keys())
    .filter(pos => isFree(map, pos) && !isRoad(map, pos))
    .sort((a, b) => {
      const [ax, ay] = a.split(',').map(Number);
      const [bx, by] = b.split(',').map(Number);
      return (ay - by) || (ax - bx); // sort by y, then x
    });

  // encode nodes into bits (e.g. 1, 2, 4, 8, 16, 32, 64, ...)
  const nodes = nodePos.map((_, i) => 1n << BigInt(i));

  // build edges
  const edges = nodePos
    .flatMap((pos1, i) => nodePos.flatMap((pos2, j) => {
        if (i === j) return [];
        const distance = getDistance(map, pos1, pos2);
        if (distance <= 0) return [];
        return [{ from: nodes[i], to: nodes[j], distance }];
      }),
    );

  const adjacencyList = new Map(
    nodePos.map((pos1, i) => [
      nodes[i],
      edges.filter(e => e.from === nodes[i]),
    ]),
  );

  return { nodePos, nodes, edges, adjacencyList };
};

const hike = (map) => {
  const { nodes, adjacencyList } = buildGraph(map);

  const start = nodes[0];
  const end = nodes[nodes.length - 1];
  const cache = new Map();

  const longestPath = (node, visited) => {
    if (node === end) return 0;
    if (BigInt(visited & node) !== 0n) return -Infinity;

    const key = `${node},${visited}`;
    if (!cache.has(key)) {
      const distances = adjacencyList.get(node).map(e => e.distance + longestPath(e.to, visited | node));
      cache.set(key, Math.max(...distances));
    }

    return cache.get(key);
  };

  return longestPath(start, 0n);
};

const removeSlopes = (input) => SLOPES
  .reduce((acc, slope) => acc.replaceAll(slope, PATH), input);

const part1 = (input) => hike(parse(input));

const part2 = (input) => hike(parse(removeSlopes(input)));

module.exports = { part1, part2 };
