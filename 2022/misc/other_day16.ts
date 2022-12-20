function part1(input: Valve[], startTime: number): number {
  const score = search(input, startTime);
  // console.log("score:", score);
  return score[0][1];
}

function part2(input: Valve[], startTime: number): number {
  const score = search(input, startTime);
  let max = 0;
  for (let j = 1; j < score.length; j++) {
    for (let i = 0; i < j; i++) {
      if (score[i][1] * 2 < max) break;
      const hashA = score[i][0];
      const hashB = score[j][0];
      if (hashA & hashB) continue;
      const total = score[i][1] + score[j][1];
      if (total > max) max = total;
    }
  }
  return max;
}

function search(input: Valve[], startTime: number) {
  // console.log('input:', input);
  const valves: Record<string, Valve> = getValves(input);
  // console.log('valves:', valves);
  const openable: Valve[] = input.filter(row => row.rate > 0);
  // console.log('openable:', openable);
  const shortestPath: Record<string, Record<string, number>> = getShortestPath(valves, openable);
  // console.log('shortestPath:', shortestPath);

  const score: [number, number][] = [];
  const unvisited: [number, string, number, number, any?][] = [];
  unvisited.push([0, 'AA', startTime, 0]);

  while (unvisited.length > 0) {
    const [visited, next, time, released, extras] = unvisited.pop()!;
    openable.forEach(row => {
      if (visited & row.hash!) return;
      score.push([visited, released]);
      // @ts-ignore
      const distance = shortestPath[next][row.from];
      const nextTime = time - distance - 1;
      if (nextTime > 0) {
        unvisited.push([
          visited + row.hash!,
          row.from,
          nextTime,
          released + nextTime * row.rate,
          extras,
        ]);
      }
    });
  }

  return score.sort((a, b) => b[1] - a[1]);
}

// gets the shortest path from each valve to each other valve
function getShortestPath(valves: Record<string, Valve>, openable: Valve[]): Record<string, Record<string, number>> {
  function findShortestPath(start: string): Record<string, number> {
    const visited: Record<string, number> = {};
    const unvisited: [Valve, number][] = [];

    unvisited.push([valves[start], 0]);
    while (unvisited.length > 0) {
      const [next, steps]: [Valve, number] = unvisited.shift()!;
      if (next.from in visited) {
        if (steps >= visited[next.from]) {
          continue;
        } else {
          visited[next.from] = steps;
        }
      } else {
        visited[next.from] = steps;
      }
      Object.keys(next.to).forEach((id: string) =>
        // @ts-ignore
        unvisited.push([valves[id], steps + next.to[id]]),
      );
    }
    delete visited[start];
    return visited;
  }

  const shortest: Record<string, Record<string, number>> = {};
  shortest.AA = findShortestPath('AA');
  openable.forEach((row: Valve) => {
    shortest[row.from] = findShortestPath(row.from);
  });
  return shortest;
}

// add unique hash to each valve with flow rate > 0
// and update neighbors with distances to the closest non-zero flow rate valves
function getValves(input: Valve[]): Record<string, Valve> {
  const valves: Record<string, Valve> = {};
  let hash = 1;
  input.forEach(row => {
    valves[row.from] = row;
    if (row.rate > 0) {
      row.hash = hash;
      hash *= 2;
    }
  });

  function preprocessInputRowTo(row: Valve, path: string[] = []) {
    if (!Array.isArray(row.to)) return row.to;

    const to: Record<string, number> = {};
    row.to.forEach((id: string) => {
      if (path.includes(id)) return;

      const next = valves[id];
      const steps =
        next.rate > 0
          ? { [id]: 0 }
          : preprocessInputRowTo(next, [...path, row.from]);

      Object.keys(steps).forEach((id: string) => {
        if (id in to) {
          to[id] = Math.min(to[id], steps[id] + 1);
        } else {
          to[id] = steps[id] + 1;
        }
      });
    });
    delete to[row.from];
    return to;
  }

  input.forEach((row: Valve) => {
    row.to = preprocessInputRowTo(row);
  });

  return valves;
}

function parse(line: string): Valve {
  const matched = line.match(
    /^Valve ([A-Z]+) has flow rate=(\d+); tunnels? leads? to valves? ([A-Z, ]+)$/,
  );
  return {
    from: matched![1],
    to: matched![3].split(', '),
    rate: +matched![2],
  };
}

interface Valve {
  from: string;
  to: string[] | Record<string, number>;
  rate: number;
  hash?: number;
}

import * as day from '../examples/day16.input';

const test1: Valve[] = day.input.trim().split('\n').map(parse);
const test2: Valve[] = day.puzzleInput.trim().split('\n').map(parse);

console.time('example part1');
console.log(part1(test1, 30), '==', day.answer1);
console.timeEnd('example part1');

console.time('example part2');
console.log(part2(test1, 26), '==', day.answer2);
console.timeEnd('example part2');

console.time('part1');
console.log(part1(test2, 30), '==', day.puzzleAnswer1);
console.timeEnd('part1');

console.time('part2');
console.log(part2(test2, 26), '==', day.puzzleAnswer2);
console.timeEnd('part2');

// 1639 == 1651
// example part1: 6.006ms
// 1707 == 1707
// example part2: 14.175ms
// 1880 == 1880
// part1: 725.265ms
// 2520 == 2520
// part2: 300.976ms
