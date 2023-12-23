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

const evaluate = (part, workflows, start = 'in') => {
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
  const acceptedParts = parts.filter(part => evaluate(part, workflows) === ACCEPTED);
  return acceptedParts.reduce((total, part) => total +
    Object.values(part).reduce((rating, value) => rating + value, 0), 0);
};

const part2 = (input) => {
  return 0;
};

module.exports = { part1, part2 };

const example1 = `
px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}
`.trim();
console.log(part1(example1));
// console.log(part2(example1));
