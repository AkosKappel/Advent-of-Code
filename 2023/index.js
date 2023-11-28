require('dotenv').config();
const fs = require('fs');
const path = require('path');
const aocLoader = require('aoc-loader');
const { performance } = require('perf_hooks');

const YEAR = 2023;
const DAY = process.argv[2] || 1;
const PART = process.argv[3] || 0;

if (!DAY) {
  throw new Error(
    'Please supply a day to test using the format `npm run day {day} {part}`',
  );
}

const day = require('./src/day' + DAY);

aocLoader(YEAR, DAY, process.env.AOC_SESSION).then((data) => {
  // Save input to inputs/input{DAY}.txt
  const inputPath = path.join(__dirname, 'inputs', `input${DAY}.txt`);
  fs.writeFile(inputPath, data, (err) => {
    if (err) {
      throw err;
    }
  });

  // Run the solution part specified
  if (PART) {
    const start = performance.now();
    const solution = day[`part${PART}`](data);
    const end = performance.now();
    console.log(`Part ${PART}: ${solution} in ${(end - start).toFixed(2)}ms\n`);
    return;
  }

  // Run both parts
  const startPart1 = performance.now();
  const solutionPart1 = day.part1(data);
  const endPart1 = performance.now();
  console.log(`Part 1: ${solutionPart1} in ${(endPart1 - startPart1).toFixed(2)}ms\n`);

  const startPart2 = performance.now();
  const solutionPart2 = day.part2(data);
  const endPart2 = performance.now();
  console.log(`Part 2: ${solutionPart2} in ${(endPart2 - startPart2).toFixed(2)}ms\n`);
});
