const fs = require('fs');
const parse = (input) => input
  .split('\n')
  .map(line => {
    const [pos, vel] = line.split('@').map(s => s.trim().split(',').map(Number));
    return {
      position: { x: pos[0], y: pos[1], z: pos[2] },
      velocity: { x: vel[0], y: vel[1], z: vel[2] },
    };
  });

const projection = (objects, dim) => objects.map(({ position, velocity }) => {
  switch (dim) {
    case 'x':
      return {
        position: { x: position.y, y: position.z },
        velocity: { x: velocity.y, y: velocity.z },
      };
    case 'y':
      return {
        position: { x: position.x, y: position.z },
        velocity: { x: velocity.x, y: velocity.z },
      };
    case 'z':
      return {
        position: { x: position.x, y: position.y },
        velocity: { x: velocity.x, y: velocity.y },
      };
    default:
      console.error(`Unknown projection dimension: ${dim}`);
  }
});

const intersection = (a, b) => {
  const determinant = a.velocity.x * b.velocity.y - a.velocity.y * b.velocity.x;
  if (determinant === 0) return null; // don't intersect

  const k1 = a.velocity.x * a.position.y - a.velocity.y * a.position.x;
  const k2 = b.velocity.x * b.position.y - b.velocity.y * b.position.x;

  const x = (k1 * b.velocity.x - k2 * a.velocity.x) / determinant;
  const y = (k1 * b.velocity.y - k2 * a.velocity.y) / determinant;

  return { x, y };
};

function* pairs(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      yield [arr[i], arr[j]];
    }
  }
}

const part1 = (input) => {
  const particles = projection(parse(input), 'z');

  const MIN = particles.length < 10 ? 7 : 200_000_000_000_000;
  const MAX = particles.length < 10 ? 27 : 400_000_000_000_000;

  const isInRange = (position) =>
    MIN <= position.x && position.x <= MAX && MIN <= position.y && position.y <= MAX;

  const isInFuture = (particle, position) =>
    Math.sign(position.x - particle.position.x) === Math.sign(particle.velocity.x);

  let count = 0;

  for (const [particle1, particle2] of pairs(particles)) {
    const p = intersection(particle1, particle2);
    if (p && isInRange(p) && isInFuture(particle1, p) && isInFuture(particle2, p)) {
      count++;
    }
  }

  return count;
};

const part2 = (input) => {
  const particles = parse(input);
  return 0;
};

module.exports = { part1, part2 };

const example1 = `
19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3
`.trim();
// const input = fs.readFileSync('../inputs/input24.txt', 'utf8');

console.log(part2(example1));
