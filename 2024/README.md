# Advent of Code 2024 · C#

My solutions to [Advent of Code 2024](https://adventofcode.com/2024), 50 of 50 stars. Part of the [Advent of Code](../README.md) collection.

**Toolchain:** .NET 9 with [AoCHelper](https://github.com/eduherminio/AoCHelper) and NUnit

Solutions live in `AdventOfCode/`, tests in `AdventOfCode/Tests/` and inputs in `AdventOfCode/Inputs/`.

## Run a day

AoCHelper prints both answers with timings. Run it from `AdventOfCode/`, where the inputs are resolved:

```bash
cd AdventOfCode
dotnet run -- 5      # one day
dotnet run -- all    # every day
```

## Tests

Tests check each day's answers for my own input and, where the puzzle provides them, for its examples. CI runs only the example tests, because some solution tests are slow.

```bash
dotnet test                             # all tests
dotnet test --filter 'Name~Example'     # example tests only
dotnet test --filter 'Day05Test'        # one day
```

Project setup based on [eduherminio/AdventOfCode.Template](https://github.com/eduherminio/AdventOfCode.Template) (MIT, see `LICENSE`).

## Days

| Day | Puzzle | Solution | Tests |
| ---: | --- | --- | --- |
| 1 | [Historian Hysteria](https://adventofcode.com/2024/day/1) | [Day01.cs](AdventOfCode/Day01.cs) | [Day01Test.cs](AdventOfCode/Tests/Day01Test.cs) |
| 2 | [Red-Nosed Reports](https://adventofcode.com/2024/day/2) | [Day02.cs](AdventOfCode/Day02.cs) | [Day02Test.cs](AdventOfCode/Tests/Day02Test.cs) |
| 3 | [Mull It Over](https://adventofcode.com/2024/day/3) | [Day03.cs](AdventOfCode/Day03.cs) | [Day03Test.cs](AdventOfCode/Tests/Day03Test.cs) |
| 4 | [Ceres Search](https://adventofcode.com/2024/day/4) | [Day04.cs](AdventOfCode/Day04.cs) | [Day04Test.cs](AdventOfCode/Tests/Day04Test.cs) |
| 5 | [Print Queue](https://adventofcode.com/2024/day/5) | [Day05.cs](AdventOfCode/Day05.cs) | [Day05Test.cs](AdventOfCode/Tests/Day05Test.cs) |
| 6 | [Guard Gallivant](https://adventofcode.com/2024/day/6) | [Day06.cs](AdventOfCode/Day06.cs) | [Day06Test.cs](AdventOfCode/Tests/Day06Test.cs) |
| 7 | [Bridge Repair](https://adventofcode.com/2024/day/7) | [Day07.cs](AdventOfCode/Day07.cs) | [Day07Test.cs](AdventOfCode/Tests/Day07Test.cs) |
| 8 | [Resonant Collinearity](https://adventofcode.com/2024/day/8) | [Day08.cs](AdventOfCode/Day08.cs) | [Day08Test.cs](AdventOfCode/Tests/Day08Test.cs) |
| 9 | [Disk Fragmenter](https://adventofcode.com/2024/day/9) | [Day09.cs](AdventOfCode/Day09.cs) | [Day09Test.cs](AdventOfCode/Tests/Day09Test.cs) |
| 10 | [Hoof It](https://adventofcode.com/2024/day/10) | [Day10.cs](AdventOfCode/Day10.cs) | [Day10Test.cs](AdventOfCode/Tests/Day10Test.cs) |
| 11 | [Plutonian Pebbles](https://adventofcode.com/2024/day/11) | [Day11.cs](AdventOfCode/Day11.cs) | [Day11Test.cs](AdventOfCode/Tests/Day11Test.cs) |
| 12 | [Garden Groups](https://adventofcode.com/2024/day/12) | [Day12.cs](AdventOfCode/Day12.cs) | [Day12Test.cs](AdventOfCode/Tests/Day12Test.cs) |
| 13 | [Claw Contraption](https://adventofcode.com/2024/day/13) | [Day13.cs](AdventOfCode/Day13.cs) | [Day13Test.cs](AdventOfCode/Tests/Day13Test.cs) |
| 14 | [Restroom Redoubt](https://adventofcode.com/2024/day/14) | [Day14.cs](AdventOfCode/Day14.cs) | [Day14Test.cs](AdventOfCode/Tests/Day14Test.cs) |
| 15 | [Warehouse Woes](https://adventofcode.com/2024/day/15) | [Day15.cs](AdventOfCode/Day15.cs) | [Day15Test.cs](AdventOfCode/Tests/Day15Test.cs) |
| 16 | [Reindeer Maze](https://adventofcode.com/2024/day/16) | [Day16.cs](AdventOfCode/Day16.cs) | [Day16Test.cs](AdventOfCode/Tests/Day16Test.cs) |
| 17 | [Chronospatial Computer](https://adventofcode.com/2024/day/17) | [Day17.cs](AdventOfCode/Day17.cs) | [Day17Test.cs](AdventOfCode/Tests/Day17Test.cs) |
| 18 | [RAM Run](https://adventofcode.com/2024/day/18) | [Day18.cs](AdventOfCode/Day18.cs) | [Day18Test.cs](AdventOfCode/Tests/Day18Test.cs) |
| 19 | [Linen Layout](https://adventofcode.com/2024/day/19) | [Day19.cs](AdventOfCode/Day19.cs) | [Day19Test.cs](AdventOfCode/Tests/Day19Test.cs) |
| 20 | [Race Condition](https://adventofcode.com/2024/day/20) | [Day20.cs](AdventOfCode/Day20.cs) | [Day20Test.cs](AdventOfCode/Tests/Day20Test.cs) |
| 21 | [Keypad Conundrum](https://adventofcode.com/2024/day/21) | [Day21.cs](AdventOfCode/Day21.cs) | [Day21Test.cs](AdventOfCode/Tests/Day21Test.cs) |
| 22 | [Monkey Market](https://adventofcode.com/2024/day/22) | [Day22.cs](AdventOfCode/Day22.cs) | [Day22Test.cs](AdventOfCode/Tests/Day22Test.cs) |
| 23 | [LAN Party](https://adventofcode.com/2024/day/23) | [Day23.cs](AdventOfCode/Day23.cs) | [Day23Test.cs](AdventOfCode/Tests/Day23Test.cs) |
| 24 | [Crossed Wires](https://adventofcode.com/2024/day/24) | [Day24.cs](AdventOfCode/Day24.cs) | [Day24Test.cs](AdventOfCode/Tests/Day24Test.cs) |
| 25 | [Code Chronicle](https://adventofcode.com/2024/day/25) | [Day25.cs](AdventOfCode/Day25.cs) | [Day25Test.cs](AdventOfCode/Tests/Day25Test.cs) |
