const DIRECTION = {
  U: [0, -1],
  D: [0, 1],
  L: [-1, 0],
  R: [1, 0],
};

const parse = (s: string): [number[], number][] => s.trim()
  .split('\n')
  .map(row => row.split(' '))
  .map(([dir, value]) => [
    Object.values(DIRECTION)[Object.keys(DIRECTION).indexOf(dir as keyof typeof DIRECTION)],
    parseInt(value, 10)],
  );

const moveRope = (instructions: [number[], number][], ropeLength: number): number => {
  const start = [0, 0];
  const rope = new Array(ropeLength).fill(0).map(() => [...start]);
  const [head, tail] = [rope[0], rope[ropeLength - 1]];

  const visited = new Set([tail.join(',')]);

  for (const [dir, steps] of instructions) {
    for (let step = 0; step < steps; step++) {
      for (let i = 0; i < ropeLength - 1; i++) {
        const current = rope[i];
        const next = rope[i + 1];

        if (current === head) { // move only the head of the rope
          head[0] += dir[0];
          head[1] += dir[1];
        }

        const dist = [current[0] - next[0], current[1] - next[1]];
        if (dist.some(x => -1 > x || x > 1)) {
          const [dx, dy] = dist.map(x => x / 2);
          next[0] += dx > 0 ? Math.ceil(dx) : Math.floor(dx);
          next[1] += dy > 0 ? Math.ceil(dy) : Math.floor(dy);
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
