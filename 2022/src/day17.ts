const WIDTH: number = 7;

const ROCKS: Uint32Array[] = [
  // ..####.
  new Uint32Array([2, 3, 4, 5]),
  // ...#...
  // ..###..
  // ...#...
  new Uint32Array([3, 9, 10, 11, 17]),
  // ....#..
  // ....#..
  // ..###..
  new Uint32Array([2, 3, 4, 11, 18]),
  // ..#....
  // ..#....
  // ..#....
  // ..#....
  new Uint32Array([2, 9, 16, 23]),
  // ..##...
  // ..##...
  new Uint32Array([2, 3, 9, 10]),
];

const sum = (a: number, b: number) => a + b;

// range(0, 3) = [0, 1, 2]
const range = (start: number, end: number): number[] =>
  new Array(end - start).fill(0).map((_, i: number) => start + i);

const canMoveHorizontal = (rock: Uint32Array, offset: number, blocked: Set<number>): boolean => {
  if (offset > 0) {
    return rock.every(v => v % WIDTH !== WIDTH - 1 && !blocked.has(v + offset));
  } else {
    return rock.every(v => v % WIDTH !== 0 && !blocked.has(v + offset));
  }
};

const moveHorizontal = (rock: Uint32Array, offset: number): void =>
  rock.forEach((v: number, i: number, arr: Uint32Array) => arr[i] = v + offset);

const rockFall = (input: string, numRocks: number): number => {
  input = input.trim();

  const blocked: Set<number> = new Set(range(0, WIDTH));

  const visited: Map<number, number[]> = new Map();
  const outcomes: number[] = [];

  let i: number = 0, j: number = 0, highest: number = 0;

  while (numRocks--) {
    // rock starts 4 units above highest column
    const rock: Uint32Array = ROCKS[i].map(v => v + (highest + 4) * WIDTH);

    let rockIsFalling: boolean = true;
    while (rockIsFalling) {
      // move rock sideways if next to wall or other rock
      switch (input[j++]) {
        case '>': // right
          if (canMoveHorizontal(rock, 1, blocked)) moveHorizontal(rock, 1);
          break;
        case '<': // left
          if (canMoveHorizontal(rock, -1, blocked)) moveHorizontal(rock, -1);
          break;
        default:
          throw new Error('Invalid input character: ' + input[j - 1]);
      }
      while (j >= input.length) j -= input.length; // cycle repeatedly through input

      // move rock down
      if (rock.every(v => !blocked.has(v - WIDTH))) {
        rock.forEach((v: number, i: number, arr: Uint32Array) => arr[i] = v - WIDTH);
      }
      // rock has hit bottom or another rock
      else {
        rock.forEach(v => blocked.add(v));
        rockIsFalling = false;

        // increase height of the highest column
        const newHeight: number = Math.floor(rock[rock.length - 1] / WIDTH);
        const increase: number = Math.max(0, newHeight - highest);

        outcomes.push(increase);
        highest += increase;

        // memoize the state of the rocks
        const state: number = j * ROCKS.length + i;
        if (visited.has(state)) {
          const pastVisits: number[] = visited.get(state)!;
          pastVisits.push(outcomes.length - 1);

          // check if the pattern is repeating
          const cycleLength = findPattern(pastVisits, outcomes);
          if (cycleLength > 0) {
            // calculate height after last rock falls
            const quotient = Math.floor(numRocks / cycleLength);
            const remainder = numRocks % cycleLength;
            return highest + quotient * outcomes.slice(-cycleLength).reduce(sum, 0) +
              outcomes.slice(-cycleLength, -cycleLength + remainder).reduce(sum, 0);
          }
        }
        // first time we've seen this state
        else {
          visited.set(state, [outcomes.length - 1]);
        }
      }
    }

    i++; // cycle repeatedly through the rocks
    while (i >= ROCKS.length) i -= ROCKS.length;
  }

  return highest;
};

function findPattern(pastVisits: number[], outcomes: number[]): number {
  const lastIndex = pastVisits[pastVisits.length - 1];

  for (const currentIndex of pastVisits.slice(0, -1)) {
    const cycleLength = lastIndex - currentIndex;
    if (currentIndex + 1 < cycleLength) continue;

    let j = 0;
    while (j < cycleLength) {
      if (outcomes[lastIndex - j] !== outcomes[currentIndex - j]) break;
      j++;
    }

    if (j === cycleLength) return cycleLength;
  }

  return 0;
}

export const part1 = (s: string): number => rockFall(s, 2022);

exports.first = part1;

export const part2 = (s: string): number => rockFall(s, 1_000_000_000_000);

exports.second = part2;
