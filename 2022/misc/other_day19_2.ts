const parse = (s: string) =>
  s
    .trim()
    .split('\n')
    .map(line => line.match(/\d+/g)!.map(Number));

const solve = (cost: number[], maxTime: number) => {
  let geodeBest = 0;

  const mostGeodes = (
    o: number,
    c: number,
    ob: number,
    g: number,
    or: number,
    cr: number,
    obr: number,
    gr: number,
    time: number,
  ): number => {
    if (time >= maxTime) {
      geodeBest = Math.max(geodeBest, g);
      return g;
    }

    // prune calls that can't realistically beat the best geode score
    // using the unrealistic heuristic of producing 1 geode robot for each turn remaining
    // this still gets rid of enough cases to bring runtime from days into seconds
    const timeLeft = maxTime - time;
    let maxGeodesPossible = g;
    for (let i = 0; i < timeLeft; i++) {
      maxGeodesPossible += gr + i;
    }
    if (maxGeodesPossible < geodeBest) {
      return 0;
    }

    // calculate new materials values for after this cycle
    const no = o + or;
    const nc = c + cr;
    const nob = ob + obr;
    const ng = g + gr;

    // overall, we can make a few assumptions to prune and reduce the solution space:
    // 1. if we have more than the maximum ore cost of a bot, always make a bot
    // 2. we only ever need as many bots to produce the maximum cost for that material in one turn
    // for example, if the geode bot costs 5 obsidian, we never need more than 5 obsidian bots, because we can only craft one geode bot per turn
    // between these optimizations, plus usually prioritizing making the most advanced bot available, we vastly trim the recursion tree and get an answer in just a few seconds

    // two guaranteed conditions that we know will always be the best:
    // we always want to make a geode robot whenever possible
    // and if we have enough clay robots, we always want to make an obsidian robot if possible
    // we almost always want to make an obsidian robot whenever possible, but there's a few edge cases where one more clay bot is better
    if (o >= cost[4] && ob >= cost[5]) {
      return mostGeodes(no - cost[4], nc, nob - cost[5], ng, or, cr, obr, gr + 1, time + 1);
    }
    if (cr >= cost[3] && obr < cost[5] && o >= cost[2] && c >= cost[3]) {
      return mostGeodes(no - cost[2], nc - cost[3], nob, ng, or, cr, obr + 1, gr, time + 1);
    }

    // for the non-guaranteed conditions, take the maximum of any
    let best = 0;
    //if not too many obsidian bots and enough to make one, make one
    if (obr < cost[5] && o >= cost[2] && c >= cost[3]) {
      best = Math.max(
        best,
        mostGeodes(no - cost[2], nc - cost[3], nob, ng, or, cr, obr + 1, gr, time + 1),
      );
    }
    // if not too many clay bots and enough to make one, make one
    if (cr < cost[3] && o >= cost[1]) {
      best = Math.max(best, mostGeodes(no - cost[1], nc, nob, ng, or, cr + 1, obr, gr, time + 1));
    }
    // if not too many ore bots and enough to make one, make one
    if (or < 4 && o >= cost[0]) {
      best = Math.max(best, mostGeodes(no - cost[0], nc, nob, ng, or + 1, cr, obr, gr, time + 1));
    }
    // if not holding on to more ore than maximum bot cost, wait and see if we can make a better bot later
    if (o <= 4) {
      best = Math.max(best, mostGeodes(no, nc, nob, ng, or, cr, obr, gr, time + 1));
    }

    return best;
  };

  return mostGeodes(0, 0, 0, 0, 1, 0, 0, 0, 0);
};

const part1 = (s: string) =>
  parse(s).reduce((quantity, blueprint, i) => {
    const geodes = solve(blueprint.slice(1), 24);
    return quantity + (i + 1) * geodes;
  }, 0);

const part2 = (s: string) =>
  parse(s)
    .slice(0, 3)
    .reduce((quantity, blueprint) => {
      const geodes = solve(blueprint.slice(1), 32);
      return quantity * geodes;
    }, 1);

export { part1, part2 };
