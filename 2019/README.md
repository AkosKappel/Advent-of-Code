# Advent of Code 2019 · Java

My solutions to [Advent of Code 2019](https://adventofcode.com/2019), 50 of 50 stars. Part of the [Advent of Code](../README.md) collection.

**Toolchain:** Java 19+ and Maven

Solutions live in `src/main/java/aoc/`, with shared helpers in `utils/` and the Intcode virtual machine used by many days in `IntcodeComputer.java`. Inputs and examples are in `src/main/resources/`.

## Run a day

Every `DayNN` class has a `main` method that prints both answers with timings:

```bash
mvn compile exec:java -Dexec.mainClass=aoc.Day05
```

## Tests

Tests check each day's answers for my own input and, where the puzzle provides them, for its examples. CI runs only the example tests, because some solution tests are slow.

```bash
mvn test                                                   # all tests
mvn test -Dtest='*Test*#testExample*'                      # example tests only
mvn test -Dtest='Day05Test*'                               # one day
```

## Days

| Day | Puzzle | Solution | Tests |
| ---: | --- | --- | --- |
| 1 | [The Tyranny of the Rocket Equation](https://adventofcode.com/2019/day/1) | [Day01.java](src/main/java/aoc/Day01.java) | [Day01Test.java](src/test/java/aoc/Day01Test.java) |
| 2 | [1202 Program Alarm](https://adventofcode.com/2019/day/2) | [Day02.java](src/main/java/aoc/Day02.java) | [Day02Test.java](src/test/java/aoc/Day02Test.java) |
| 3 | [Crossed Wires](https://adventofcode.com/2019/day/3) | [Day03.java](src/main/java/aoc/Day03.java) | [Day03Test.java](src/test/java/aoc/Day03Test.java) |
| 4 | [Secure Container](https://adventofcode.com/2019/day/4) | [Day04.java](src/main/java/aoc/Day04.java) | [Day04Test.java](src/test/java/aoc/Day04Test.java) |
| 5 | [Sunny with a Chance of Asteroids](https://adventofcode.com/2019/day/5) | [Day05.java](src/main/java/aoc/Day05.java) | [Day05Test.java](src/test/java/aoc/Day05Test.java) |
| 6 | [Universal Orbit Map](https://adventofcode.com/2019/day/6) | [Day06.java](src/main/java/aoc/Day06.java) | [Day06Test.java](src/test/java/aoc/Day06Test.java) |
| 7 | [Amplification Circuit](https://adventofcode.com/2019/day/7) | [Day07.java](src/main/java/aoc/Day07.java) | [Day07Test.java](src/test/java/aoc/Day07Test.java) |
| 8 | [Space Image Format](https://adventofcode.com/2019/day/8) | [Day08.java](src/main/java/aoc/Day08.java) | [Day08Test.java](src/test/java/aoc/Day08Test.java) |
| 9 | [Sensor Boost](https://adventofcode.com/2019/day/9) | [Day09.java](src/main/java/aoc/Day09.java) | [Day09Test.java](src/test/java/aoc/Day09Test.java) |
| 10 | [Monitoring Station](https://adventofcode.com/2019/day/10) | [Day10.java](src/main/java/aoc/Day10.java) | [Day10Test.java](src/test/java/aoc/Day10Test.java) |
| 11 | [Space Police](https://adventofcode.com/2019/day/11) | [Day11.java](src/main/java/aoc/Day11.java) | [Day11Test.java](src/test/java/aoc/Day11Test.java) |
| 12 | [The N-Body Problem](https://adventofcode.com/2019/day/12) | [Day12.java](src/main/java/aoc/Day12.java) | [Day12Test.java](src/test/java/aoc/Day12Test.java) |
| 13 | [Care Package](https://adventofcode.com/2019/day/13) | [Day13.java](src/main/java/aoc/Day13.java) | [Day13Test.java](src/test/java/aoc/Day13Test.java) |
| 14 | [Space Stoichiometry](https://adventofcode.com/2019/day/14) | [Day14.java](src/main/java/aoc/Day14.java) | [Day14Test.java](src/test/java/aoc/Day14Test.java) |
| 15 | [Oxygen System](https://adventofcode.com/2019/day/15) | [Day15.java](src/main/java/aoc/Day15.java) | [Day15Test.java](src/test/java/aoc/Day15Test.java) |
| 16 | [Flawed Frequency Transmission](https://adventofcode.com/2019/day/16) | [Day16.java](src/main/java/aoc/Day16.java) | [Day16Test.java](src/test/java/aoc/Day16Test.java) |
| 17 | [Set and Forget](https://adventofcode.com/2019/day/17) | [Day17.java](src/main/java/aoc/Day17.java) | [Day17Test.java](src/test/java/aoc/Day17Test.java) |
| 18 | [Many-Worlds Interpretation](https://adventofcode.com/2019/day/18) | [Day18.java](src/main/java/aoc/Day18.java) | [Day18Test.java](src/test/java/aoc/Day18Test.java) |
| 19 | [Tractor Beam](https://adventofcode.com/2019/day/19) | [Day19.java](src/main/java/aoc/Day19.java) | [Day19Test.java](src/test/java/aoc/Day19Test.java) |
| 20 | [Donut Maze](https://adventofcode.com/2019/day/20) | [Day20.java](src/main/java/aoc/Day20.java) | [Day20Test.java](src/test/java/aoc/Day20Test.java) |
| 21 | [Springdroid Adventure](https://adventofcode.com/2019/day/21) | [Day21.java](src/main/java/aoc/Day21.java) | [Day21Test.java](src/test/java/aoc/Day21Test.java) |
| 22 | [Slam Shuffle](https://adventofcode.com/2019/day/22) | [Day22.java](src/main/java/aoc/Day22.java) | [Day22Test.java](src/test/java/aoc/Day22Test.java) |
| 23 | [Category Six](https://adventofcode.com/2019/day/23) | [Day23.java](src/main/java/aoc/Day23.java) | [Day23Test.java](src/test/java/aoc/Day23Test.java) |
| 24 | [Planet of Discord](https://adventofcode.com/2019/day/24) | [Day24.java](src/main/java/aoc/Day24.java) | [Day24Test.java](src/test/java/aoc/Day24Test.java) |
| 25 | [Cryostasis](https://adventofcode.com/2019/day/25) | [Day25.java](src/main/java/aoc/Day25.java) | [Day25Test.java](src/test/java/aoc/Day25Test.java) |
