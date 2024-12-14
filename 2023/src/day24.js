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

  const a = [];
  const b = [];

  const add = (particles, n) => {
    const [px0, py0, pz0, vx0, vy0, vz0] = [
      particles[0].position.x, particles[0].position.y, particles[0].position.z,
      particles[0].velocity.x, particles[0].velocity.y, particles[0].velocity.z,
    ].map(BigInt);
    const [pxN, pyN, pzN, vxN, vyN, vzN] = [
      particles[n].position.x, particles[n].position.y, particles[n].position.z,
      particles[n].velocity.x, particles[n].velocity.y, particles[n].velocity.z,
    ].map(BigInt);

    a.push([vy0 - vyN, vxN - vx0, 0n, pyN - py0, px0 - pxN, 0n]);
    b.push(px0 * vy0 - py0 * vx0 - pxN * vyN + pyN * vxN);
    a.push([vz0 - vzN, 0n, vxN - vx0, pzN - pz0, 0n, px0 - pxN]);
    b.push(px0 * vz0 - pz0 * vx0 - pxN * vzN + pzN * vxN);
  };

  for (let i = 1; i <= 3; i++) add(particles, i);

  const determinant = (matrix) => {
    if (matrix.length === 0) return 1n;

    const [firstRow, ...remainingRows] = matrix;
    const minors = firstRow.map((val, i) =>
      val * determinant(remainingRows.map(row => row.toSpliced(i, 1))),
    );

    return minors.reduce((acc, val, i) => (i % 2 ? acc - val : acc + val), 0n);
  };

  const cramer = (matrix1, matrix2) => {
    const det1 = determinant(matrix1);
    return matrix1.map((_, i) => determinant(matrix1.map((r, j) => r.toSpliced(i, 1, matrix2[j]))) / det1);
  };

  const [rockPosX, rockPosY, rockPosZ] = cramer(a, b);
  return Number(rockPosX + rockPosY + rockPosZ);
};

module.exports = { part1, part2 };
