const START_VALVE_NAME: string = 'AA';

interface Node {
  name: string;
  flowRate: number;
  neighbours: string[];
}

type Table = Record<string, Record<string, number>>;
type Dict = Record<string, number>;

const parse = (s: string): Node[] => s.trim()
  .split('\n')
  .map(line => line.match(/Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? (\w+(?:, \w+)*)/))
  .filter(Boolean)
  .map((match) => ({
    name: match![1],
    flowRate: +match![2],
    neighbours: match![3].split(', '),
  }));

const filterDistances = (nodesToFilter: Node[], allDistances: Table): Table => {
  // create new table with only the nodes we want
  const relevantDistances: Table = {};
  for (const v of nodesToFilter.map(n => n.name)) {
    relevantDistances[v] = {};
    for (const u of nodesToFilter.map(n => n.name).filter(u => u !== v)) {
      relevantDistances[v][u] = allDistances[v][u];
    }
  }
  return relevantDistances;
};

const floydWarshall = (nodes: Node[]): Table => {
  const distances: Table = {};

  // initialize distance matrix
  for (const u of nodes.map(n => n.name)) {
    distances[u] = {};
    for (const v of nodes.map(n => n.name)) {
      distances[u][v] = Infinity;
    }
  }

  // initialize distance matrix with known distances
  for (const node of nodes) {
    const u = node.name;
    for (const v of node.neighbours) {
      distances[u][v] = 1; // edge weight is always 1
    }
  }

  // initialize distance matrix with self distances
  for (const u of nodes.map(n => n.name)) {
    distances[u][u] = 0; // distance from node to itself is 0
  }

  // floyd-warshall
  for (const k of nodes.map(n => n.name)) {
    for (const i of nodes.map(n => n.name)) {
      for (const j of nodes.map(n => n.name)) {
        distances[i][j] = Math.min(distances[i][j], distances[i][k] + distances[k][j]);
      }
    }
  }

  return distances;
};

// construct every possible path that can be taken with the given time limit
const search = (nodes: Node[], distances: Table, current: Node, time: number, path: Dict = {}): Dict[] => {
  const res = [path];

  for (const node of nodes) {
    const remainingTime: number = time - distances[current.name][node.name] - 1;

    // no time left to go to next node and open it
    if (remainingTime < 2) continue;

    // remove next node from the list of nodes to visit
    const remainingNodes: Node[] = nodes.filter(n => n.name !== node.name);

    // update path with next node's name and the time it will stay open
    const newPath: Dict = { ...path, [node.name]: remainingTime };

    res.push(...search(remainingNodes, distances, node, remainingTime, newPath));
  }

  return res;
};

// generator function of the above function to iterate over all possible paths
function* searchGen(nodes: Node[], distances: Table, current: Node, time: number, path: Dict = {}): IterableIterator<Dict> {

  for (const next of nodes) {
    const remainingTime: number = time - distances[current.name][next.name] - 1;

    // no time left to go to next node and open it
    if (remainingTime < 2) continue;

    // remove next node from the list of nodes to visit
    const remainingNodes: Node[] = nodes.filter(n => n.name !== next.name);

    // update path with next node's name and the time it will stay open
    const newPath: Dict = { ...path, [next.name]: remainingTime };

    // recurse
    yield* searchGen(remainingNodes, distances, next, remainingTime, newPath);
  }

  yield path;
}

// iterate over path and calculate score of released pressure
const pathScore = (path: Dict, flowRates: Dict = {}): number => Object
  .entries(path)
  .reduce((score: number, [name, time]: [string, number]) => score + flowRates[name] * time, 0);

export const part1 = (s: string): number => {
  const valves: Node[] = parse(s);
  const time: number = 30;

  const start: Node = valves.find(v => v.name === START_VALVE_NAME)!;
  const nonZeroValves: Node[] = valves.filter(v => v.flowRate > 0);

  const allDistances: Table = floydWarshall(valves);
  const distances: Table = filterDistances([start, ...nonZeroValves], allDistances);

  // mapping of valve names to its flow rate
  const flowRates: Dict = {};
  for (const valve of nonZeroValves) {
    flowRates[valve.name] = valve.flowRate;
  }

  return search(nonZeroValves, distances, start, time)
    .reduce((maxScore: number, path: Dict) =>
      Math.max(maxScore, pathScore(path, flowRates)), 0);
};

exports.first = part1;

export const part2 = (s: string): number => {
  parse(s);
  return 0;
};

exports.second = part2;

import * as day from '../examples/day16.input';

console.time('run');

console.log(part1(day.input));
console.log(day.answer1);
// console.log(part2(day.input));
// console.log(day.answer2);
console.log(part1(day.puzzleInput));
console.log(day.puzzleAnswer1);
// console.log(part2(day.puzzleInput));
// console.log(day.puzzleAnswer2);

console.timeEnd('run');
