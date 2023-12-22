const DIRECTIONS = {
  U: [0, 1], D: [0, -1],
  R: [1, 0], L: [-1, 0],
};

const parse = (input) => input
  .split('\n')
  .map(line => {
    const [direction, steps, color] = line.split(' ');
    return { direction, steps: +steps, color: color.slice(1, -1) };
  });

const getVerticesAndPerimeter = (plan) => {
  const vertices = [];
  let perimeter = 0;
  let x = 0, y = 0;

  for (const { direction, steps } of plan) {
    const [dx, dy] = DIRECTIONS[direction];
    x += dx * steps;
    y += dy * steps;
    vertices.push({ x, y });
    perimeter += steps;
  }
  vertices.push({ x: 0, y: 0 });

  return { vertices, perimeter };
};

const shoeLace = (vertices) => {
  let area = 0;
  for (let i = 0; i < vertices.length - 1; i++) {
    const { x: x1, y: y1 } = vertices[i];
    const { x: x2, y: y2 } = vertices[i + 1];
    area += (x2 - x1) * y1;
  }
  return Math.abs(area);
};

const part1 = (input) => {
  const digPlan = parse(input);
  const { vertices, perimeter } = getVerticesAndPerimeter(digPlan);
  return shoeLace(vertices) + perimeter / 2 + 1;
};

const correctPlan = (plan) => plan.map(({ direction, steps, color }) => ({
  direction: ['R', 'D', 'L', 'U'][color[color.length - 1]],
  steps: parseInt(color.slice(1, -1), 16),
  color: direction + steps,
}));

const part2 = (input) => {
  const digPlan = parse(input);
  const fixedPlan = correctPlan(digPlan);
  const { vertices, perimeter } = getVerticesAndPerimeter(fixedPlan);
  return shoeLace(vertices) + perimeter / 2 + 1;
};

module.exports = { part1, part2 };
