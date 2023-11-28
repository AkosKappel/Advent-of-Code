const fs = require('fs');

const day = process.argv[2];
const solutionPath = `src/day${day}.js`;
const testPath = `tests/day${day}.test.js`;
const inputPath = `inputs/input${day}.txt`;

const solutionContent = `function part1(input) {
  return 0;
}

function part2(input) {
  return 0;
}

module.exports = { part1, part2 };
`;

const testContent = `const fs = require('fs');
const { part1, part2 } = require('../src/day${day}');

const example1 = \`\`;
const input = fs.readFileSync('inputs/input${day}.txt', 'utf8');

test('example part 1', () => {
  expect(part1(example1)).toBe(0);
});

test('example part 2', () => {
  expect(part2(example1)).toBe(0);
});

test('part 1', () => {
  expect(part1(input)).toBe(0);
});

test('part 2', () => {
  expect(part2(input)).toBe(0);
});
`;

fs.writeFile(solutionPath, solutionContent, (err) => {
  if (err) {
    console.error(`Error creating file: ${err}`);
    return;
  }
  console.log(`File created: ${solutionPath}`);
});

fs.writeFile(testPath, testContent, (err) => {
  if (err) {
    console.error(`Error creating file: ${err}`);
    return;
  }
  console.log(`File created: ${testPath}`);
});

fs.writeFile(inputPath, '', (err) => {
  if (err) {
    console.error(`Error creating file: ${err}`);
    return;
  }
  console.log(`File created: ${inputPath}`);
});
