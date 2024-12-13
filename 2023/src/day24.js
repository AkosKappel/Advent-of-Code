const parse = (input) => input
  .split('\n')
  .map(line => {
    const [pos, vel] = line.split('@').map(s => s.trim().split(',').map(Number));
    return {
      position: { x: pos[0], y: pos[1], z: pos[2] },
      velocity: { x: vel[0], y: vel[1], z: vel[2] },
    };
  });

const project = (objects, dim) => objects.map(({ position, velocity }) => {
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

const isInRange = (n) => 200_000_000_000_000 <= n && n <= 400_000_000_000_000;

const isInFuture = (stone, position) => Math.sign(position.x - stone.position.x) === Math.sign(stone.velocity.x);

const part1 = (input) => {
  const hailstones = project(parse(input), 'z');
  let count = 0;

  for (let i = 0; i < hailstones.length; i++) {
    for (let j = i + 1; j < hailstones.length; j++) {
      const p = intersection(hailstones[i], hailstones[j]);
      if (p && isInRange(p.x) && isInRange(p.y) && isInFuture(hailstones[i], p) && isInFuture(hailstones[j], p)) {
        count++;
      }
    }
  }

  return count;
};

const part2 = (input) => {
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

console.log(part2(example1));
