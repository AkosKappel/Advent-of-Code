# Advent of Code 2020 · Kotlin

My solutions to [Advent of Code 2020](https://adventofcode.com/2020), 50 of 50 stars. Part of the [Advent of Code](../README.md) collection.

**Toolchain:** Kotlin 1.9 on JDK 8, built with the included Gradle wrapper

Solutions live in `src/main/kotlin/` with shared helpers in `Utils.kt`. Inputs and examples are in `src/main/resources/`. `template.py <day>` scaffolds the files for a new day.

## Run a day

```bash
./gradlew run -Pday=5
```

## Tests

Tests check each day's answers for my own input and, where the puzzle provides them, for its examples. CI runs only the example tests, because some solution tests are slow.

```bash
./gradlew test                          # all tests
./gradlew test --tests '*example*'      # example tests only
./gradlew test --tests 'Day05Test'      # one day
```

## Days

| Day | Puzzle | Solution | Tests |
| ---: | --- | --- | --- |
| 1 | [Report Repair](https://adventofcode.com/2020/day/1) | [Day01.kt](src/main/kotlin/Day01.kt) | [Day01Test.kt](src/test/kotlin/Day01Test.kt) |
| 2 | [Password Philosophy](https://adventofcode.com/2020/day/2) | [Day02.kt](src/main/kotlin/Day02.kt) | [Day02Test.kt](src/test/kotlin/Day02Test.kt) |
| 3 | [Toboggan Trajectory](https://adventofcode.com/2020/day/3) | [Day03.kt](src/main/kotlin/Day03.kt) | [Day03Test.kt](src/test/kotlin/Day03Test.kt) |
| 4 | [Passport Processing](https://adventofcode.com/2020/day/4) | [Day04.kt](src/main/kotlin/Day04.kt) | [Day04Test.kt](src/test/kotlin/Day04Test.kt) |
| 5 | [Binary Boarding](https://adventofcode.com/2020/day/5) | [Day05.kt](src/main/kotlin/Day05.kt) | [Day05Test.kt](src/test/kotlin/Day05Test.kt) |
| 6 | [Custom Customs](https://adventofcode.com/2020/day/6) | [Day06.kt](src/main/kotlin/Day06.kt) | [Day06Test.kt](src/test/kotlin/Day06Test.kt) |
| 7 | [Handy Haversacks](https://adventofcode.com/2020/day/7) | [Day07.kt](src/main/kotlin/Day07.kt) | [Day07Test.kt](src/test/kotlin/Day07Test.kt) |
| 8 | [Handheld Halting](https://adventofcode.com/2020/day/8) | [Day08.kt](src/main/kotlin/Day08.kt) | [Day08Test.kt](src/test/kotlin/Day08Test.kt) |
| 9 | [Encoding Error](https://adventofcode.com/2020/day/9) | [Day09.kt](src/main/kotlin/Day09.kt) | [Day09Test.kt](src/test/kotlin/Day09Test.kt) |
| 10 | [Adapter Array](https://adventofcode.com/2020/day/10) | [Day10.kt](src/main/kotlin/Day10.kt) | [Day10Test.kt](src/test/kotlin/Day10Test.kt) |
| 11 | [Seating System](https://adventofcode.com/2020/day/11) | [Day11.kt](src/main/kotlin/Day11.kt) | [Day11Test.kt](src/test/kotlin/Day11Test.kt) |
| 12 | [Rain Risk](https://adventofcode.com/2020/day/12) | [Day12.kt](src/main/kotlin/Day12.kt) | [Day12Test.kt](src/test/kotlin/Day12Test.kt) |
| 13 | [Shuttle Search](https://adventofcode.com/2020/day/13) | [Day13.kt](src/main/kotlin/Day13.kt) | [Day13Test.kt](src/test/kotlin/Day13Test.kt) |
| 14 | [Docking Data](https://adventofcode.com/2020/day/14) | [Day14.kt](src/main/kotlin/Day14.kt) | [Day14Test.kt](src/test/kotlin/Day14Test.kt) |
| 15 | [Rambunctious Recitation](https://adventofcode.com/2020/day/15) | [Day15.kt](src/main/kotlin/Day15.kt) | [Day15Test.kt](src/test/kotlin/Day15Test.kt) |
| 16 | [Ticket Translation](https://adventofcode.com/2020/day/16) | [Day16.kt](src/main/kotlin/Day16.kt) | [Day16Test.kt](src/test/kotlin/Day16Test.kt) |
| 17 | [Conway Cubes](https://adventofcode.com/2020/day/17) | [Day17.kt](src/main/kotlin/Day17.kt) | [Day17Test.kt](src/test/kotlin/Day17Test.kt) |
| 18 | [Operation Order](https://adventofcode.com/2020/day/18) | [Day18.kt](src/main/kotlin/Day18.kt) | [Day18Test.kt](src/test/kotlin/Day18Test.kt) |
| 19 | [Monster Messages](https://adventofcode.com/2020/day/19) | [Day19.kt](src/main/kotlin/Day19.kt) | [Day19Test.kt](src/test/kotlin/Day19Test.kt) |
| 20 | [Jurassic Jigsaw](https://adventofcode.com/2020/day/20) | [Day20.kt](src/main/kotlin/Day20.kt) | [Day20Test.kt](src/test/kotlin/Day20Test.kt) |
| 21 | [Allergen Assessment](https://adventofcode.com/2020/day/21) | [Day21.kt](src/main/kotlin/Day21.kt) | [Day21Test.kt](src/test/kotlin/Day21Test.kt) |
| 22 | [Crab Combat](https://adventofcode.com/2020/day/22) | [Day22.kt](src/main/kotlin/Day22.kt) | [Day22Test.kt](src/test/kotlin/Day22Test.kt) |
| 23 | [Crab Cups](https://adventofcode.com/2020/day/23) | [Day23.kt](src/main/kotlin/Day23.kt) | [Day23Test.kt](src/test/kotlin/Day23Test.kt) |
| 24 | [Lobby Layout](https://adventofcode.com/2020/day/24) | [Day24.kt](src/main/kotlin/Day24.kt) | [Day24Test.kt](src/test/kotlin/Day24Test.kt) |
| 25 | [Combo Breaker](https://adventofcode.com/2020/day/25) | [Day25.kt](src/main/kotlin/Day25.kt) | [Day25Test.kt](src/test/kotlin/Day25Test.kt) |
