const ACCEPTED = 'A';
const REJECTED = 'R';

const parse = (input) => {
  const [workflowsStr, partsStr] = input.split('\n\n');

  const partsRegex = /[xmas]=\d+/g;
  const parts = partsStr.split('\n').map(line => {
    const matches = line.match(partsRegex);
    return matches.reduce((acc, match) => {
      const [key, value] = match.split('=');
      acc[key] = parseInt(value, 10);
      return acc;
    }, {});
  });

  const workflowRegex = /(?<name>\w+){(?<flow>.*)}/g;
  const flowRegex = /(?<letter>[xmas])(?<operator>[<>])(?<value>\d+):(?<dst>\w+)/g;
  const workflows = new Map();
  workflowsStr.split('\n').forEach(line => {
    const matches = line.matchAll(workflowRegex);
    const { name, flow: flowStr } = matches.next().value.groups;
    const flow = [...flowStr.matchAll(flowRegex)].map(match => {
      const { letter, operator, value, dst } = match.groups;
      return { letter, operator, value: parseInt(value, 10), dst };
    });
    flow.push({ letter: '', operator: '', value: 0, dst: flowStr.split(',').reverse()[0] });
    workflows.set(name, flow);
  });

  return { workflows, parts };
};

const evaluatePart = (part, workflows, start = 'in') => {
  let current = start;
  while (current !== ACCEPTED && current !== REJECTED) {
    const flow = workflows.get(current);
    const { dst } = flow.find(({ letter, operator, value }) => {
      if (!letter && !operator && !value) return true;
      else if (operator === '<') return part[letter] < value;
      else if (operator === '>') return part[letter] > value;
      else throw new Error(`Unknown operator: ${operator}`);
    });
    current = dst;
  }
  return current;
};

const part1 = (input) => {
  const { workflows, parts } = parse(input);
  const acceptedParts = parts.filter(p => evaluatePart(p, workflows) === ACCEPTED);
  return acceptedParts.reduce((total, part) => total +
    Object.values(part).reduce((rating, value) => rating + value, 0), 0);
};

const evaluateRegion = (region, workflows, label = 'in') => {
  if (label === ACCEPTED) {
    return Object.values(region)
      .reduce((volume, [min, max]) => volume * (max - min + 1), 1);
  }

  if (label === REJECTED) {
    return 0;
  }

  const flow = workflows.get(label);
  let total = 0;

  for (const { letter, operator, value, dst } of flow) {
    if (!letter && !operator && !value) {
      total += evaluateRegion(region, workflows, dst);
      continue;
    }

    const [min, max] = region[letter];

    if (operator === '<') {
      if (min < value) {
        const newRegion = { ...region };
        newRegion[letter] = [min, value - 1];
        total += evaluateRegion(newRegion, workflows, dst);
      }
      if (max >= value) {
        region[letter] = [value, max];
      }
    } else if (operator === '>') {
      if (max > value) {
        const newRegion = { ...region };
        newRegion[letter] = [value + 1, max];
        total += evaluateRegion(newRegion, workflows, dst);
      }
      if (min <= value) {
        region[letter] = [min, value];
      }
    }
  }

  return total;
};

const part2 = (input) => {
  const { workflows } = parse(input);
  const minValue = 1, maxValue = 4000;
  return evaluateRegion({
    x: [minValue, maxValue],
    m: [minValue, maxValue],
    a: [minValue, maxValue],
    s: [minValue, maxValue],
  }, workflows);
};

module.exports = { part1, part2 };
