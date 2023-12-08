const parse = (input) => {
  const [instructions, network] = input.split('\n\n');
  const path = instructions.trim()
    .split('')
    .map(char => char === 'L' ? 0 : 1);
  const nodes = network.trim()
    .split('\n')
    .map(line => line.replace(/[()]/g, ''))
    .reduce((acc, line) => {
      const [name, value] = line.split(' = ');
      acc[name] = value.split(', ');
      return acc;
    }, {});
  return { path, nodes };
};

const walk = (path, nodes, startNode, targetNodes) => {
  let steps = 0;
  let currentNode = startNode;
  let pathIndex = 0;

  while (!targetNodes.has(currentNode)) {
    const direction = path[pathIndex];
    currentNode = nodes[currentNode][direction];
    pathIndex = (pathIndex + 1) % path.length;
    steps++;
  }

  return steps;
};

const part1 = (input) => {
  const { path, nodes } = parse(input);
  return walk(path, nodes, 'AAA', new Set(['ZZZ']));
};

const gcd = (a, b) => !b ? a : gcd(b, a % b);

const lcm = (a, b) => a * b / gcd(a, b);

const part2 = (input) => {
  const { path, nodes } = parse(input);

  let currentNodes = Object.keys(nodes).filter(node => node.endsWith('A'));
  const targetNodes = new Set(Object.keys(nodes).filter(node => node.endsWith('Z')));

  const stepsToTarget = currentNodes.map(node => walk(path, nodes, node, targetNodes));
  return stepsToTarget.reduce(lcm);
};

module.exports = { part1, part2 };
