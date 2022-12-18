const START_VALVE_NAME: string = 'AA';

interface Node {
  name: string;
  flowRate: number;
  neighbours: string[];
}

type Table = Record<string, Record<string, number>>;

const parse = (s: string): Node[] => s.trim()
  .split('\n')
  .map(line => line.match(/Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? (\w+(?:, \w+)*)/))
  .filter(Boolean)
  .map(match => ({
    name: match![1],
    flowRate: +match![2],
    neighbours: match![3].split(', '),
  }));

const nameToNumber = (name: string, coef: number = 26) => name
  .toUpperCase()
  .split('')
  .reduce((acc: number, c: string, i: number) =>
    acc + (c.charCodeAt(0) - 'A'.charCodeAt(0)) * coef ** (name.length - i - 1), 0);

const filterDistances = (nodes: Node[], allDistances: Table): Table => {
  // starting node is always relevant
  const start: Node = nodes.find(n => n.name === START_VALVE_NAME)!;

  // select all nodes with positive flow rate
  const relevantNodes: Node[] = [start, ...nodes.filter(n => n.flowRate > 0)];

  // create new table with only relevant nodes
  const relevantDistances: Table = {};
  for (const v of relevantNodes.map(n => n.name)) {
    relevantDistances[v] = {};
    for (const u of relevantNodes.map(n => n.name)) {
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

  return filterDistances(nodes, distances);
};

export const part1 = (s: string): number => {
  const valves: Node[] = parse(s);

  const distances: Table = floydWarshall(valves);
  console.log(distances);

  return 0;
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
// console.log(part1(day.puzzleInput));
// console.log(day.puzzleAnswer1);
// console.log(part2(day.puzzleInput));
// console.log(day.puzzleAnswer2);

console.timeEnd('run');
