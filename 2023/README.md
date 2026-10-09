# Advent of Code 2023 · JavaScript

My solutions to [Advent of Code 2023](https://adventofcode.com/2023), 50 of 50 stars. Part of the [Advent of Code](../README.md) collection.

**Toolchain:** Node.js 22 and Jest

Solutions live in `src/`, inputs in `inputs/`. `npm run create-day <day>` scaffolds the files for a new day.

## Run a day

```bash
npm ci
npm run day 5        # both parts
npm run day 5 2      # part 2 only
```

If an input file is missing, the runner downloads it using the `AOC_SESSION` session token from a `.env` file.

## Tests

Tests check each day's answers for my own input and, where the puzzle provides them, for its examples. CI runs only the example tests, because some solution tests are slow.

```bash
npm test                 # all tests
npx jest -t example      # example tests only
npx jest day5.test       # one day
```

## Days

| Day | Puzzle | Solution | Tests |
| ---: | --- | --- | --- |
| 1 | [Trebuchet?!](https://adventofcode.com/2023/day/1) | [day1.js](src/day1.js) | [day1.test.js](tests/day1.test.js) |
| 2 | [Cube Conundrum](https://adventofcode.com/2023/day/2) | [day2.js](src/day2.js) | [day2.test.js](tests/day2.test.js) |
| 3 | [Gear Ratios](https://adventofcode.com/2023/day/3) | [day3.js](src/day3.js) | [day3.test.js](tests/day3.test.js) |
| 4 | [Scratchcards](https://adventofcode.com/2023/day/4) | [day4.js](src/day4.js) | [day4.test.js](tests/day4.test.js) |
| 5 | [If You Give A Seed A Fertilizer](https://adventofcode.com/2023/day/5) | [day5.js](src/day5.js) | [day5.test.js](tests/day5.test.js) |
| 6 | [Wait For It](https://adventofcode.com/2023/day/6) | [day6.js](src/day6.js) | [day6.test.js](tests/day6.test.js) |
| 7 | [Camel Cards](https://adventofcode.com/2023/day/7) | [day7.js](src/day7.js) | [day7.test.js](tests/day7.test.js) |
| 8 | [Haunted Wasteland](https://adventofcode.com/2023/day/8) | [day8.js](src/day8.js) | [day8.test.js](tests/day8.test.js) |
| 9 | [Mirage Maintenance](https://adventofcode.com/2023/day/9) | [day9.js](src/day9.js) | [day9.test.js](tests/day9.test.js) |
| 10 | [Pipe Maze](https://adventofcode.com/2023/day/10) | [day10.js](src/day10.js) | [day10.test.js](tests/day10.test.js) |
| 11 | [Cosmic Expansion](https://adventofcode.com/2023/day/11) | [day11.js](src/day11.js) | [day11.test.js](tests/day11.test.js) |
| 12 | [Hot Springs](https://adventofcode.com/2023/day/12) | [day12.js](src/day12.js) | [day12.test.js](tests/day12.test.js) |
| 13 | [Point of Incidence](https://adventofcode.com/2023/day/13) | [day13.js](src/day13.js) | [day13.test.js](tests/day13.test.js) |
| 14 | [Parabolic Reflector Dish](https://adventofcode.com/2023/day/14) | [day14.js](src/day14.js) | [day14.test.js](tests/day14.test.js) |
| 15 | [Lens Library](https://adventofcode.com/2023/day/15) | [day15.js](src/day15.js) | [day15.test.js](tests/day15.test.js) |
| 16 | [The Floor Will Be Lava](https://adventofcode.com/2023/day/16) | [day16.js](src/day16.js) | [day16.test.js](tests/day16.test.js) |
| 17 | [Clumsy Crucible](https://adventofcode.com/2023/day/17) | [day17.js](src/day17.js) | [day17.test.js](tests/day17.test.js) |
| 18 | [Lavaduct Lagoon](https://adventofcode.com/2023/day/18) | [day18.js](src/day18.js) | [day18.test.js](tests/day18.test.js) |
| 19 | [Aplenty](https://adventofcode.com/2023/day/19) | [day19.js](src/day19.js) | [day19.test.js](tests/day19.test.js) |
| 20 | [Pulse Propagation](https://adventofcode.com/2023/day/20) | [day20.js](src/day20.js) | [day20.test.js](tests/day20.test.js) |
| 21 | [Step Counter](https://adventofcode.com/2023/day/21) | [day21.js](src/day21.js) | [day21.test.js](tests/day21.test.js) |
| 22 | [Sand Slabs](https://adventofcode.com/2023/day/22) | [day22.js](src/day22.js) | [day22.test.js](tests/day22.test.js) |
| 23 | [A Long Walk](https://adventofcode.com/2023/day/23) | [day23.js](src/day23.js) | [day23.test.js](tests/day23.test.js) |
| 24 | [Never Tell Me The Odds](https://adventofcode.com/2023/day/24) | [day24.js](src/day24.js) | [day24.test.js](tests/day24.test.js) |
| 25 | [Snowverload](https://adventofcode.com/2023/day/25) | [day25.js](src/day25.js) | [day25.test.js](tests/day25.test.js) |
