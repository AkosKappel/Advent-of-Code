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

export const part1 = (s: string): number => {
  const instructions = parse(s);

  const start = [0, 0];
  const [head, tail] = [[...start], [...start]];

  const visited = new Set([tail.join(',')]);

  for (const [dir, steps] of instructions) {
    for (let step = 0; step < steps; step++) {
      head[0] += dir[0];
      head[1] += dir[1];

      const dist = [head[0] - tail[0], head[1] - tail[1]];
      if (dist.some(x => -1 > x || x > 1)) {
        const [dx, dy] = dist.map(x => x / 2);
        tail[0] += dx > 0 ? Math.ceil(dx) : Math.floor(dx);
        tail[1] += dy > 0 ? Math.ceil(dy) : Math.floor(dy);
      }

      visited.add(tail.join(','));
    }
  }

  return visited.size;
};

exports.first = part1;

export const part2 = (s: string): number => {
  const instructions = parse(s);
  const start = [0, 0];

  const ropeLength = 10;
  const rope = new Array(ropeLength).fill(0).map(() => [...start]);
  const [head, tail] = [rope[0], rope[ropeLength - 1]];

  const visited = new Set([tail.join(',')]);

  for (const [dir, steps] of instructions) {
    for (let step = 0; step < steps; step++) {
      for (let i = 0; i < ropeLength - 1; i++) {
        const current = rope[i];
        const next = rope[i + 1];

        if (current === head) {
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

exports.second = part2;
