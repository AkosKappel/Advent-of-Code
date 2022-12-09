const DIRECTION: { [dir: string]: number[] } = {
  U: [0, -1],
  D: [0, 1],
  L: [-1, 0],
  R: [1, 0],
};

const parse = (s: string): [number[], number][] => s.trim()
  .split('\n')
  .map(row => row.split(' '))
  .map(([dir, value]) => [DIRECTION[dir], parseInt(value, 10)]);

const tooFar = (x: number): boolean => x < -1 || 1 < x; // Math.abs(x) > 1

const round = (n: number): number => n > 0 ? Math.ceil(n) : Math.floor(n);

const moveRope = (instructions: [number[], number][], ropeLength: number): number => {
  const start = [0, 0];
  const rope = new Array(ropeLength).fill(0).map(() => [...start]);
  const [head, tail] = [rope[0], rope[ropeLength - 1]];

  const visited = new Set();

  for (const [dir, steps] of instructions) {
    for (let step = 0; step < steps; step++) {
      for (let i = 0; i < ropeLength - 1; i++) {
        const current = rope[i];
        const next = rope[i + 1];

        if (current === head) { // move only the head of the rope
          head[0] += dir[0];
          head[1] += dir[1];
          // head.forEach((_: number, j: number) => head[j] += dir[j]);
        }

        const dist = [current[0] - next[0], current[1] - next[1]];
        // const dist = current.map((_: number, j: number) => current[j] - next[j]);

        if (dist.some(tooFar)) {
          const [dx, dy] = dist.map(x => x / 2);
          next[0] += round(dx);
          next[1] += round(dy);
          // next.forEach((_: number, j: number) => next[j] += round(dist[j] / 2));
        }
      }

      visited.add(tail.join(','));
    }
  }

  return visited.size;
};

export const part1 = (s: string): number => moveRope(parse(s), 2);

exports.first = part1;

export const part2 = (s: string): number => moveRope(parse(s), 10);

exports.second = part2;
