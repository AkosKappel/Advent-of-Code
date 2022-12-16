interface Node {
  name: string;
  flowRate: number;
  neighbours: string[];
}

const parse = (s: string): Node[] => s.trim()
  .split('\n')
  .map(line => line.match(/Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? (\w+(?:, \w+)*)/))
  .filter(Boolean)
  .map(match => ({
    name: match![1],
    flowRate: Number(match![2]),
    neighbours: match![3].split(', '),
  }));

// TODO: maybe BFS is enough instead of Dijkstra
const dijkstra = (nodes: Node[], start: Node) => {
  // create a priority queue
  const queue = new Set(nodes);

  // initialize all distances to infinity except start
  const distances: Record<string, number> = {};
  for (const node of nodes) {
    distances[node.name] = Infinity;
  }
  distances[start.name] = 0;

  // repeat while queue is not empty
  while (queue.size > 0) {
    // remove node with smallest distance from queue
    const node = [...queue].reduce((a, b) => distances[a.name] < distances[b.name] ? a : b);
    queue.delete(node);

    // update distances to neighbours
    for (const neighbour of node.neighbours) {
      const alt = distances[node.name] + 1; // edge weight is always 1
      if (alt < distances[neighbour]) {
        distances[neighbour] = alt;
      }
    }
  }

  return distances;
};

export const part1 = (s: string): number => {
  const valves = parse(s);
  const start = valves.find(v => v.name === 'AA')!;

  let remainingTime: number = 30;
  let releasedPressure: number = 0;
  let currentValve: Node = start;

  while (remainingTime > 0) {
    // console.log('currentValve:', currentValve);
    const distances = dijkstra(valves, currentValve);
    // console.log('distances:', distances);
    const gains = valves
      .filter(v => v.flowRate > 0)
      .map(v => [v.name, distances[v.name] + 1, v.flowRate / (distances[v.name] + 1)]); // 1 is the time to open the valve
    if (gains.length === 0) break; // no more valves to open

    // console.log('gains:', gains);
    const maxGainValve = gains.reduce((a, b) => a[2] > b[2] ? a : b);
    console.log('maxGainValve:', maxGainValve);

    const [name, distance, cost] = maxGainValve;
    currentValve = valves.find(v => v.name === name)!;
    remainingTime -= distance as number;
    // console.log('remainingTime:', remainingTime);
    // console.log(nextValve.flowRate, remainingTime);
    releasedPressure += remainingTime * currentValve.flowRate;
    // console.log('releasedPressure:', remainingTime, '*', currentValve.flowRate, '=', releasedPressure);
    currentValve.flowRate = 0;
    // console.log('-----------------------------------------');
  }

  return releasedPressure;
};

exports.first = part1;

export const part2 = (s: string): number => {
  parse(s);
  return 0;
};

exports.second = part2;

import * as day from '../examples/day16.input';

console.log(part1(day.input));
console.log(day.answer1);
// console.log(part2(day.input));
// console.log(day.answer2);
// console.log(part1(day.puzzleInput));
// console.log(day.puzzleAnswer1);
// console.log(part2(day.puzzleInput));
// console.log(day.puzzleAnswer2);
