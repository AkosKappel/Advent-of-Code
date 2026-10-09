# Advent of Code 2022 · TypeScript

My solutions to [Advent of Code 2022](https://adventofcode.com/2022), 50 of 50 stars. Part of the [Advent of Code](../README.md) collection.

**Toolchain:** Node.js 22, TypeScript and Jest

Solutions live in `src/`, inputs in `input/`. `misc/` keeps alternative solutions I studied after solving a day.

## Run a day

```bash
npm ci
npm run day 5      # part 1
npm run day 5+     # part 2
```

If an input file is missing, the runner downloads it using the session cookie stored in a `cookie` file.

## Tests

Tests check each day's answers for my own input and, where the puzzle provides them, for its examples. CI runs only the example tests, because some solution tests are slow.

```bash
npm test                 # all tests
npx jest -t example      # example tests only
npx jest day05           # one day
```

Project setup based on [atme/advent-of-code](https://github.com/atme/advent-of-code) (MIT, see `LICENSE`).

## Days

| Day | Puzzle | Solution | Tests |
| ---: | --- | --- | --- |
| 1 | [Calorie Counting](https://adventofcode.com/2022/day/1) | [day01.ts](src/day01.ts) | [day01.test.ts](tests/day01.test.ts) |
| 2 | [Rock Paper Scissors](https://adventofcode.com/2022/day/2) | [day02.ts](src/day02.ts) | [day02.test.ts](tests/day02.test.ts) |
| 3 | [Rucksack Reorganization](https://adventofcode.com/2022/day/3) | [day03.ts](src/day03.ts) | [day03.test.ts](tests/day03.test.ts) |
| 4 | [Camp Cleanup](https://adventofcode.com/2022/day/4) | [day04.ts](src/day04.ts) | [day04.test.ts](tests/day04.test.ts) |
| 5 | [Supply Stacks](https://adventofcode.com/2022/day/5) | [day05.ts](src/day05.ts) | [day05.test.ts](tests/day05.test.ts) |
| 6 | [Tuning Trouble](https://adventofcode.com/2022/day/6) | [day06.ts](src/day06.ts) | [day06.test.ts](tests/day06.test.ts) |
| 7 | [No Space Left On Device](https://adventofcode.com/2022/day/7) | [day07.ts](src/day07.ts) | [day07.test.ts](tests/day07.test.ts) |
| 8 | [Treetop Tree House](https://adventofcode.com/2022/day/8) | [day08.ts](src/day08.ts) | [day08.test.ts](tests/day08.test.ts) |
| 9 | [Rope Bridge](https://adventofcode.com/2022/day/9) | [day09.ts](src/day09.ts) | [day09.test.ts](tests/day09.test.ts) |
| 10 | [CathodeRay Tube](https://adventofcode.com/2022/day/10) | [day10.ts](src/day10.ts) | [day10.test.ts](tests/day10.test.ts) |
| 11 | [Monkey in the Middle](https://adventofcode.com/2022/day/11) | [day11.ts](src/day11.ts) | [day11.test.ts](tests/day11.test.ts) |
| 12 | [Hill Climbing Algorithm](https://adventofcode.com/2022/day/12) | [day12.ts](src/day12.ts) | [day12.test.ts](tests/day12.test.ts) |
| 13 | [Distress Signal](https://adventofcode.com/2022/day/13) | [day13.ts](src/day13.ts) | [day13.test.ts](tests/day13.test.ts) |
| 14 | [Regolith Reservoir](https://adventofcode.com/2022/day/14) | [day14.ts](src/day14.ts) | [day14.test.ts](tests/day14.test.ts) |
| 15 | [Beacon Exclusion Zone](https://adventofcode.com/2022/day/15) | [day15.ts](src/day15.ts) | [day15.test.ts](tests/day15.test.ts) |
| 16 | [Proboscidea Volcanium](https://adventofcode.com/2022/day/16) | [day16.ts](src/day16.ts) | [day16.test.ts](tests/day16.test.ts) |
| 17 | [Pyroclastic Flow](https://adventofcode.com/2022/day/17) | [day17.ts](src/day17.ts) | [day17.test.ts](tests/day17.test.ts) |
| 18 | [Boiling Boulders](https://adventofcode.com/2022/day/18) | [day18.ts](src/day18.ts) | [day18.test.ts](tests/day18.test.ts) |
| 19 | [Not Enough Minerals](https://adventofcode.com/2022/day/19) | [day19.ts](src/day19.ts) | [day19.test.ts](tests/day19.test.ts) |
| 20 | [Grove Positioning System](https://adventofcode.com/2022/day/20) | [day20.ts](src/day20.ts) | [day20.test.ts](tests/day20.test.ts) |
| 21 | [Monkey Math](https://adventofcode.com/2022/day/21) | [day21.ts](src/day21.ts) | [day21.test.ts](tests/day21.test.ts) |
| 22 | [Monkey Map](https://adventofcode.com/2022/day/22) | [day22.ts](src/day22.ts) | [day22.test.ts](tests/day22.test.ts) |
| 23 | [Unstable Diffusion](https://adventofcode.com/2022/day/23) | [day23.ts](src/day23.ts) | [day23.test.ts](tests/day23.test.ts) |
| 24 | [Blizzard Basin](https://adventofcode.com/2022/day/24) | [day24.ts](src/day24.ts) | [day24.test.ts](tests/day24.test.ts) |
| 25 | [Full of Hot Air](https://adventofcode.com/2022/day/25) | [day25.ts](src/day25.ts) | [day25.test.ts](tests/day25.test.ts) |
