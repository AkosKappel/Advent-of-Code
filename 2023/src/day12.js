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

const countPossibilities = (springs, counts, counting = 0, memo = {}) => {
  const key = `${springs}:${counts.join(',')}:${counting}`;
  if (memo[key] !== undefined) {
    return memo[key];
  }

  if (!springs.length) {
    memo[key] = counts.length === 0 && counting === 0 ? 1 : 0;
    return memo[key];
  }

  let total = 0;
  const options = springs[0] === UNKNOWN ? [OPERATIONAL, DAMAGED] : [springs[0]];

  for (const option of options) {
    switch (option) {
      case DAMAGED:
        // start / continue counting from next block
        total += countPossibilities(springs.substring(1), counts, counting + 1, memo);
        break;
      case OPERATIONAL:
        if (!counting) {
          // move to next block without counting
          total += countPossibilities(springs.substring(1), counts, 0, memo);
        } else {
          if (counts.length > 0 && counts[0] === counting) {
            // end current block counting and move to next block
            total += countPossibilities(springs.substring(1), counts.slice(1), 0, memo);
          }
        }
        break;
    }
  }

  memo[key] = total;
  return total;
};

const part1 = (input) => parse(input)
  .reduce((acc, { springs, counts }) => acc + countPossibilities(springs + OPERATIONAL, counts), 0);

const unfold = (record, times) => {
  const { springs, counts } = record;
  return {
    springs: [...Array(times).fill(springs)].join(UNKNOWN),
    counts: [...Array(times).fill(counts)].flat(),
  };
};

const part2 = (input) => parse(input)
  .map(record => unfold(record, 5))
  .reduce((acc, { springs, counts }) => acc + countPossibilities(springs + OPERATIONAL, counts), 0);

module.exports = { part1, part2 };

const countPossibilitiesFast = (springs, counts) => {
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
