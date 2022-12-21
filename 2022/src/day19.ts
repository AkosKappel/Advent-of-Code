const parse = (s: string): number[][] => s.trim()
  .split('\n')
  .map(line => line.match(/\d+/g)!.map(Number));

// time_left, ore, clay, obsidian, geodes, n_robots_ore, n_robots_clay, n_robots_obsidian, n_robots_geode, did_not_build
type State = [number, number, number, number, number, number, number, number, number, number[]?];

const [ORE, CLAY, OBSIDIAN, GEODE]: number[] = [0, 1, 2, 3];

const bestCaseScenario = (initialAmount: number, robots: number, t: number): number =>
  initialAmount + robots * (t + 1) + t * (t + 1) / 2;

// iterative DFS
const search = (blueprint: number[], time: number) => {
  const [
    oreRobotCostOre,        // cost in ore to build an ore-mining robot
    clayRobotCostOre,       // cost in ore to build a clay-mining robot
    obsidianRobotCostOre,   // cost in ore to build an obsidian-mining robot
    obsidianRobotCostClay,  // cost in clay to build an obsidian-mining robot
    geodeRobotCostOre,      // cost in ore to build a geode-mining robot
    geodeRobotCostObsidian, // cost in obsidian to build a geode-mining robot
  ]: number[] = blueprint;

  let best: number = 0;
  const visited: Set<State> = new Set();

  // calculate the maximum needed amounts of minerals
  const maxOreNeeded: number = Math.max(oreRobotCostOre, clayRobotCostOre, obsidianRobotCostOre, geodeRobotCostOre);
  const maxClayNeeded: number = Math.max(obsidianRobotCostClay);
  const maxObsidianNeeded: number = Math.max(geodeRobotCostObsidian);

  // start with 1 ore-mining robot
  const queue: State[] = [[time, 0, 0, 0, 0, 1, 0, 0, 0, []]];

  while (queue.length) {
    const tmp: State = queue.pop()!;
    // last item in tmp is not part of the state
    const state: State = tmp.slice(0, -1) as State;

    if (visited.has(state)) continue;
    visited.add(state);

    // unpack item from queue
    const [
      timeLeft, ore, clay, obsidian, geodes,
      numOreRobots, numClayRobots, numObsidianRobots, numGeodeRobots,
      didNotBuild,
    ]: State = tmp;

    // each robot we have mines 1 resource of its type, taking 1 minute
    const newOre = ore + numOreRobots;
    const newClay = clay + numClayRobots;
    const newObsidian = obsidian + numObsidianRobots;
    const newGeode = geodes + numGeodeRobots;
    const newTime = timeLeft - 1;

    // if we run out of time, we reached a goal state
    // update the best number of geodes we were able to mine
    if (newTime <= 0) {
      best = Math.max(best, newGeode);
      continue;
    }

    // if we can't mine more geodes in the best-case scenario, bail out
    if (bestCaseScenario(newGeode, numGeodeRobots, newTime) <= best) continue;

    // if we can't mine enough obsidian to build new geode robots even in the
    // best-case scenario, we already know how many geodes we'll be able to get
    // (likewise for ore)
    if (
      (bestCaseScenario(newObsidian, numObsidianRobots, newTime) < geodeRobotCostObsidian) ||
      (bestCaseScenario(newOre, numOreRobots, newTime) < geodeRobotCostOre)
    ) {
      best = Math.max(best, newGeode + numGeodeRobots * newTime);
      continue;
    }

    const canBuild: number[] = [];

    // following are the possible actions (transitions) to take...

    // 1. if we have enough materials for a geode-mining robot, we could also build that
    if (obsidian >= geodeRobotCostObsidian && ore >= geodeRobotCostOre) {
      if (!didNotBuild?.includes(GEODE)) {
        canBuild.push(GEODE);
        queue.push([
          newTime,
          newOre - geodeRobotCostOre, newClay, newObsidian - geodeRobotCostObsidian, newGeode,
          numOreRobots, numClayRobots, numObsidianRobots, numGeodeRobots + 1,
          [],
        ]);
      }
    }

    // 2. if we have enough materials for an obsidian-mining robot, we could also build that
    // optimization: avoid building more obsidian robots than the max obsidian per minute needed
    if (numObsidianRobots < maxObsidianNeeded && clay >= obsidianRobotCostClay && ore >= obsidianRobotCostOre) {
      if (!didNotBuild?.includes(OBSIDIAN)) {
        canBuild.push(OBSIDIAN);
        queue.push([
          newTime,
          newOre - obsidianRobotCostOre, newClay - obsidianRobotCostClay, newObsidian, newGeode,
          numOreRobots, numClayRobots, numObsidianRobots + 1, numGeodeRobots,
          [],
        ]);
      }
    }

    // 3. if we have enough materials for a clay-mining robot, we could also build that
    // optimization: avoid building more clay robots than the max clay per minute needed
    if (numClayRobots < maxClayNeeded && ore >= clayRobotCostOre) {
      if (!didNotBuild?.includes(CLAY)) {
        canBuild.push(CLAY);
        queue.push([
          newTime,
          newOre - clayRobotCostOre, newClay, newObsidian, newGeode,
          numOreRobots, numClayRobots + 1, numObsidianRobots, numGeodeRobots,
          [],
        ]);
      }
    }

    // 4. if we have enough materials for an ore-mining robot, we could also build that
    // optimization: avoid building more ore robots than the max ore per minute needed
    if (numOreRobots < maxOreNeeded && ore >= oreRobotCostOre) {
      if (!didNotBuild?.includes(ORE)) {
        canBuild.push(ORE);
        queue.push([
          newTime,
          newOre - oreRobotCostOre, newClay, newObsidian, newGeode,
          numOreRobots + 1, numClayRobots, numObsidianRobots, numGeodeRobots,
          [],
        ]);
      }
    }

    // 5. we can always just spend one minute only mining without building any robot
    if (
      (numObsidianRobots && obsidian < maxObsidianNeeded) ||
      (numClayRobots && clay < maxClayNeeded) ||
      (ore < maxOreNeeded)
    ) {
      queue.push([
        newTime, newOre, newClay, newObsidian, newGeode,
        numOreRobots, numClayRobots, numObsidianRobots, numGeodeRobots, canBuild,
      ]);
    }
  }

  return best;
};

export const part1 = (s: string): number => parse(s)
  .reduce((acc: number, [id, ...blueprint]: number[]) =>
    acc + id * search(blueprint, 24), 0);

exports.first = part1;

export const part2 = (s: string): number => parse(s)
  .slice(0, 3)
  .map(([id, ...blueprint]: number[]) => search(blueprint, 32))
  .reduce((acc: number, value: number) => acc * value, 1);

exports.second = part2;
