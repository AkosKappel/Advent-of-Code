const OPERATIONAL = '.';
const DAMAGED = '#';
const UNKNOWN = '?';

const parse = (input) => input
  .split('\n')
  .map(line => {
    const [springs, counts] = line.split(' ');
    return {
      springs,
      counts: counts.split(',').map(Number),
    };
  });

const countPossibilities = (springs, counts) => {
  const memo = {};

  const dp = (springIndex, countIndex, total = 0) => {
    const key = `${springIndex},${countIndex}`;
    if (memo[key] !== undefined) return memo[key];

    if (springIndex >= springs.length) {
      memo[key] = countIndex === counts.length;
      return memo[key];
    }

    const char = springs[springIndex];
    const count = counts[countIndex];

    if (char === OPERATIONAL || char === UNKNOWN) {
      total += dp(springIndex + 1, countIndex);
    }

    if (
      (char === DAMAGED || char === UNKNOWN) &&
      countIndex < counts.length &&
      springIndex + count <= springs.length &&
      !springs.slice(springIndex, springIndex + count).includes(OPERATIONAL) &&
      (springIndex + count === springs.length || springs[springIndex + count] !== DAMAGED)
    ) {
      total += dp(springIndex + count + 1, countIndex + 1);
    }

    memo[key] = total;
    return memo[key];
  };

  return dp(0, 0);
};

const part1 = (input) => parse(input)
  .reduce((acc, { springs, counts }) => acc + countPossibilities(springs, counts), 0);

const unfold = (record, times) => {
  const { springs, counts } = record;
  return {
    springs: [...Array(times).fill(springs)].join(UNKNOWN),
    counts: [...Array(times).fill(counts)].flat(),
  };
};

const part2 = (input) => parse(input)
  .map(record => unfold(record, 5))
  .reduce((acc, { springs, counts }) => acc + countPossibilities(springs, counts), 0);

module.exports = { part1, part2 };

const example1 = `
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`.trim();
console.log(part1(example1));
console.log(part2(example1));
