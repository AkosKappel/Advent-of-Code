const OPERATIONAL = '.';
const DAMAGED = '#';
const UNKNOWN = '?';

const parse = (input) => input
  .split('\n')
  .map(line => {
    const [spring, sizes] = line.split(' ');
    return {
      spring,
      sizes: sizes.split(',').map(Number),
      unknowns: spring.split('').reduce((acc, char, i) => {
        if (char === UNKNOWN) {
          acc.push(i);
        }
        return acc;
      }, []),
    };
  });

const validArrangement = (arrangement, sizes) => {
  const arr = arrangement
    .split('')
    .reduce((acc, char) => {
      if (char === DAMAGED) {
        if (acc.length === 0) acc.push(1);
        else acc[acc.length - 1] += 1;
      } else {
        acc.push(0);
      }
      return acc;
    }, [])
    .filter(Boolean);
  return sizes.every((size, i) => size === arr[i])
    && sizes.length === arr.length;
};

const generatePossibleArrangements = (arrangement, unknowns) => {
  const stack = [{ arrangement, unknowns }];
  const possibilities = [];

  while (stack.length > 0) {
    const { arrangement, unknowns } = stack.pop();

    if (unknowns.length === 0) {
      possibilities.push(arrangement);
      continue;
    }

    const [first, ...rest] = unknowns;
    const before = arrangement.slice(0, first);
    const after = arrangement.slice(first + 1);

    stack.push({ arrangement: before + OPERATIONAL + after, unknowns: rest });
    stack.push({ arrangement: before + DAMAGED + after, unknowns: rest });
  }

  return possibilities;
};

const part1 = (input) => parse(input)
  .reduce((acc, { spring, sizes, unknowns }) =>
    acc + generatePossibleArrangements(spring, unknowns)
      .filter(arrangement => validArrangement(arrangement, sizes))
      .length, 0);

const part2 = (input) => {
  return 0;
};

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
// console.log(part2(example1));
