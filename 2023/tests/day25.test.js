const fs = require('fs');
const { part1 } = require('../src/day25');

const example1 = `
jqt: rhn xhk nvd
rsh: frs pzl lsr
xhk: hfx
cmg: qnr nvd lhk bvb
rhn: xhk bvb hfx
bvb: xhk hfx
pzl: lsr hfx nvd
qnr: nvd
ntq: jqt hfx bvb xhk
nvd: lhk
lsr: lhk
rzs: qnr cmg lsr rsh
frs: qnr lhk lsr
`.trim();

const input = fs.readFileSync('inputs/input25.txt', 'utf8');

describe('part 1', () => {
  test('example', () => {
    expect(part1(example1)).toBe(54);
  });

  test('solution', () => {
    expect(part1(input)).toBe(591890);
  });
});
