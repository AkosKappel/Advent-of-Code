# Advent of Code 2025 · Elixir

My solutions to [Advent of Code 2025](https://adventofcode.com/2025), 24 of 24 stars. Part of the [Advent of Code](../README.md) collection.

**Toolchain:** Elixir 1.19 on OTP 28 (see `.tool-versions`)

Solutions live in `lib/advent_of_code/`, with one Mix task per part in `lib/mix/tasks/`. Inputs are cached in `inputs/`.

## Run a day

```bash
mix deps.get
mix d05.p1         # part 1
mix d05.p2         # part 2
mix d05.p1 -b      # benchmark with Benchee
```

If an input is missing, it is downloaded using the session cookie in the `ADVENT_OF_CODE_SESSION_COOKIE` environment variable.

## Tests

Tests check each day's answers for my own input and, where the puzzle provides them, for its examples. CI runs only the example tests, because some solution tests are slow.

```bash
mix test                                                                       # all tests
mix test --only test:'test part1 example' --only test:'test part2 example'     # example tests only
mix test test/advent_of_code/day_05_test.exs                                   # one day
```

Project setup based on [mhanberg/advent-of-code-elixir-starter](https://github.com/mhanberg/advent-of-code-elixir-starter).

## Days

| Day | Puzzle | Solution | Tests |
| ---: | --- | --- | --- |
| 1 | [Secret Entrance](https://adventofcode.com/2025/day/1) | [day_01.ex](lib/advent_of_code/day_01.ex) | [day_01_test.exs](test/advent_of_code/day_01_test.exs) |
| 2 | [Gift Shop](https://adventofcode.com/2025/day/2) | [day_02.ex](lib/advent_of_code/day_02.ex) | [day_02_test.exs](test/advent_of_code/day_02_test.exs) |
| 3 | [Lobby](https://adventofcode.com/2025/day/3) | [day_03.ex](lib/advent_of_code/day_03.ex) | [day_03_test.exs](test/advent_of_code/day_03_test.exs) |
| 4 | [Printing Department](https://adventofcode.com/2025/day/4) | [day_04.ex](lib/advent_of_code/day_04.ex) | [day_04_test.exs](test/advent_of_code/day_04_test.exs) |
| 5 | [Cafeteria](https://adventofcode.com/2025/day/5) | [day_05.ex](lib/advent_of_code/day_05.ex) | [day_05_test.exs](test/advent_of_code/day_05_test.exs) |
| 6 | [Trash Compactor](https://adventofcode.com/2025/day/6) | [day_06.ex](lib/advent_of_code/day_06.ex) | [day_06_test.exs](test/advent_of_code/day_06_test.exs) |
| 7 | [Laboratories](https://adventofcode.com/2025/day/7) | [day_07.ex](lib/advent_of_code/day_07.ex) | [day_07_test.exs](test/advent_of_code/day_07_test.exs) |
| 8 | [Playground](https://adventofcode.com/2025/day/8) | [day_08.ex](lib/advent_of_code/day_08.ex) | [day_08_test.exs](test/advent_of_code/day_08_test.exs) |
| 9 | [Movie Theater](https://adventofcode.com/2025/day/9) | [day_09.ex](lib/advent_of_code/day_09.ex) | [day_09_test.exs](test/advent_of_code/day_09_test.exs) |
| 10 | [Factory](https://adventofcode.com/2025/day/10) | [day_10.ex](lib/advent_of_code/day_10.ex) | [day_10_test.exs](test/advent_of_code/day_10_test.exs) |
| 11 | [Reactor](https://adventofcode.com/2025/day/11) | [day_11.ex](lib/advent_of_code/day_11.ex) | [day_11_test.exs](test/advent_of_code/day_11_test.exs) |
| 12 | [Christmas Tree Farm](https://adventofcode.com/2025/day/12) | [day_12.ex](lib/advent_of_code/day_12.ex) | [day_12_test.exs](test/advent_of_code/day_12_test.exs) |
