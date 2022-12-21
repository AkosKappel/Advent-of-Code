const parse = (s: string): number[][][] => s.trim()
  .split('\n')
  .map(line => line.match(/(\d+)/g)!.map(Number))
  .map(([blueprint, ore, clay, obsidian_ore, obsidian_clay, geode_ore, geode_obs]: number[]) => [
    [ore, 0, 0, 0],
    [clay, 0, 0, 0],
    [obsidian_ore, obsidian_clay, 0, 0],
    [geode_ore, 0, geode_obs, 0],
  ]);

const [ORE, CLAY, OBSIDIAN, GEODE]: number[] = [0, 1, 2, 3];

const harvest = (costs: number[][], minutes: number) => {
  const score = (time: number, [material, robots]: [number[], number[]]): number =>
    ((material[GEODE] + (minutes - time) * robots[GEODE]) << 16) +
    (robots[OBSIDIAN] << 8) +
    (robots[CLAY] << 4) +
    robots[ORE];

  let prioq = [[
    [0, 0, 0, 0],
    [1, 0, 0, 0],
  ]];

  const maxBotsNeeded: number[] = [ORE, CLAY, OBSIDIAN]
    .map((r: number) => costs
      .map((cost: number[]) => cost[r])
      .reduce((max: number, val: number) => max > val ? max : val))
    .concat(Infinity);

  let time: number = 0;
  while (time++ < minutes) {
    // @ts-ignore
    prioq = prioq
      .reduce((next, [resources, robots]: number[][]) => {
        [GEODE, OBSIDIAN, CLAY, ORE]
          .filter((type: number) =>
            maxBotsNeeded[type] > robots[type] &&
            resources.every((m: number, i: number) => m >= costs[type][i]))
          .map((type: number) => [
            resources.map((amount: number, i: number) => amount + robots[i] - costs[type][i]),
            robots.map((r: number, i: number) => r + (i === type ? 1 : 0))])
          .concat(
            [[resources.map((amount: number, i: number) => amount + robots[i]), robots]])
          .forEach((s) =>
            // @ts-ignore
            next.push(s.concat(score(time, s))));
        return next;
      }, [])
      .sort(([, , a]: number[], [, , b]: number[]) => b - a)
      .slice(0, 5000);
  }

  const [material] = prioq[0];
  return material[GEODE];
};

export const part1 = (s: string): number => parse(s)
  .map((blueprint: number[][], i: number) => [harvest(blueprint, 24), i + 1])
  .map(([a, b]: number[]) => a * b)
  .reduce((sum: number, val: number) => sum + val);

exports.first = part1;

export const part2 = (s: string): number => parse(s)
  .slice(0, 3)
  .map(blueprint => harvest(blueprint, 32))
  .reduce((p: number, val: number) => p * val);

exports.second = part2;

import * as day from '../examples/day19.input';

console.time('example part 1');
console.log(part1(day.input));
console.log(day.answer1);
console.timeEnd('example part 1');

console.time('example part 2');
console.log(part2(day.input));
console.log(day.answer2);
console.timeEnd('example part 2');

console.time('puzzle part 1');
console.log(part1(day.puzzleInput));
console.log(day.puzzleAnswer1);
console.timeEnd('puzzle part 1');

console.time('puzzle part 2');
console.log(part2(day.puzzleInput));
console.log(day.puzzleAnswer2);
console.timeEnd('puzzle part 2');

// 33
// example part 1: 424.659ms

// 3472
// example part 2: 660.957ms

// 1293
// puzzle part 1: 4.392s

// 21840
// puzzle part 2: 873.175ms
