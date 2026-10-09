# Advent of Code 2018 · Go

My solutions to [Advent of Code 2018](https://adventofcode.com/2018), 50 of 50 stars. Part of the [Advent of Code](../README.md) collection.

**Toolchain:** Go 1.24 (see `go.mod`)

Each day is its own package in `dayNN/` with `main.go`, `main_test.go` and the puzzle input in `input.txt`.

## Run a day

`main.go` runs every day listed in `daysToRun`:

```bash
go run .
```

## Tests

Tests check each day's answers for my own input and, where the puzzle provides them, for its examples. CI runs only the example tests, because some solution tests are slow.

```bash
go test ./...                     # all tests
go test ./... -run //Example      # example tests only
go test ./day05                   # one day
```

## Days

| Day | Puzzle | Solution | Tests |
| ---: | --- | --- | --- |
| 1 | [Chronal Calibration](https://adventofcode.com/2018/day/1) | [main.go](day01/main.go) | [main_test.go](day01/main_test.go) |
| 2 | [Inventory Management System](https://adventofcode.com/2018/day/2) | [main.go](day02/main.go) | [main_test.go](day02/main_test.go) |
| 3 | [No Matter How You Slice It](https://adventofcode.com/2018/day/3) | [main.go](day03/main.go) | [main_test.go](day03/main_test.go) |
| 4 | [Repose Record](https://adventofcode.com/2018/day/4) | [main.go](day04/main.go) | [main_test.go](day04/main_test.go) |
| 5 | [Alchemical Reduction](https://adventofcode.com/2018/day/5) | [main.go](day05/main.go) | [main_test.go](day05/main_test.go) |
| 6 | [Chronal Coordinates](https://adventofcode.com/2018/day/6) | [main.go](day06/main.go) | [main_test.go](day06/main_test.go) |
| 7 | [The Sum of Its Parts](https://adventofcode.com/2018/day/7) | [main.go](day07/main.go) | [main_test.go](day07/main_test.go) |
| 8 | [Memory Maneuver](https://adventofcode.com/2018/day/8) | [main.go](day08/main.go) | [main_test.go](day08/main_test.go) |
| 9 | [Marble Mania](https://adventofcode.com/2018/day/9) | [main.go](day09/main.go) | [main_test.go](day09/main_test.go) |
| 10 | [The Stars Align](https://adventofcode.com/2018/day/10) | [main.go](day10/main.go) | [main_test.go](day10/main_test.go) |
| 11 | [Chronal Charge](https://adventofcode.com/2018/day/11) | [main.go](day11/main.go) | [main_test.go](day11/main_test.go) |
| 12 | [Subterranean Sustainability](https://adventofcode.com/2018/day/12) | [main.go](day12/main.go) | [main_test.go](day12/main_test.go) |
| 13 | [Mine Cart Madness](https://adventofcode.com/2018/day/13) | [main.go](day13/main.go) | [main_test.go](day13/main_test.go) |
| 14 | [Chocolate Charts](https://adventofcode.com/2018/day/14) | [main.go](day14/main.go) | [main_test.go](day14/main_test.go) |
| 15 | [Beverage Bandits](https://adventofcode.com/2018/day/15) | [main.go](day15/main.go) | [main_test.go](day15/main_test.go) |
| 16 | [Chronal Classification](https://adventofcode.com/2018/day/16) | [main.go](day16/main.go) | [main_test.go](day16/main_test.go) |
| 17 | [Reservoir Research](https://adventofcode.com/2018/day/17) | [main.go](day17/main.go) | [main_test.go](day17/main_test.go) |
| 18 | [Settlers of The North Pole](https://adventofcode.com/2018/day/18) | [main.go](day18/main.go) | [main_test.go](day18/main_test.go) |
| 19 | [Go With The Flow](https://adventofcode.com/2018/day/19) | [main.go](day19/main.go) | [main_test.go](day19/main_test.go) |
| 20 | [A Regular Map](https://adventofcode.com/2018/day/20) | [main.go](day20/main.go) | [main_test.go](day20/main_test.go) |
| 21 | [Chronal Conversion](https://adventofcode.com/2018/day/21) | [main.go](day21/main.go) | [main_test.go](day21/main_test.go) |
| 22 | [Mode Maze](https://adventofcode.com/2018/day/22) | [main.go](day22/main.go) | [main_test.go](day22/main_test.go) |
| 23 | [Experimental Emergency Teleportation](https://adventofcode.com/2018/day/23) | [main.go](day23/main.go) | [main_test.go](day23/main_test.go) |
| 24 | [Immune System Simulator 20XX](https://adventofcode.com/2018/day/24) | [main.go](day24/main.go) | [main_test.go](day24/main_test.go) |
| 25 | [Four-Dimensional Adventure](https://adventofcode.com/2018/day/25) | [main.go](day25/main.go) | [main_test.go](day25/main_test.go) |
