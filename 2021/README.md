# Advent of Code 2021 · Python

My solutions to [Advent of Code 2021](https://adventofcode.com/2021), 50 of 50 stars. Part of the [Advent of Code](../README.md) collection.

**Toolchain:** Python 3.13 with NumPy (`pip install -r requirements.txt`)

Solutions live in `src/`, inputs and examples in `data/`. `misc/` keeps alternative solutions I studied after solving a day.

## Run a day

Each solution prints both answers. Run it from `src/`, since inputs are resolved relative to it:

```bash
cd src && python day05.py
```

## Tests

Tests check each day's answers for my own input and, where the puzzle provides them, for its examples. CI runs only the example tests, because some solution tests are slow.

The tests use `unittest` and are run from `tests/`:

```bash
cd tests
PYTHONPATH=.. python -m pytest                  # all tests
PYTHONPATH=.. python -m pytest -k example       # example tests only
PYTHONPATH=.. python -m pytest test_day05.py    # one day
```

## Days

| Day | Puzzle | Solution | Tests |
| ---: | --- | --- | --- |
| 1 | [Sonar Sweep](https://adventofcode.com/2021/day/1) | [day01.py](src/day01.py) | [test_day01.py](tests/test_day01.py) |
| 2 | [Dive!](https://adventofcode.com/2021/day/2) | [day02.py](src/day02.py) | [test_day02.py](tests/test_day02.py) |
| 3 | [Binary Diagnostic](https://adventofcode.com/2021/day/3) | [day03.py](src/day03.py) | [test_day03.py](tests/test_day03.py) |
| 4 | [Giant Squid](https://adventofcode.com/2021/day/4) | [day04.py](src/day04.py) | [test_day04.py](tests/test_day04.py) |
| 5 | [Hydrothermal Venture](https://adventofcode.com/2021/day/5) | [day05.py](src/day05.py) | [test_day05.py](tests/test_day05.py) |
| 6 | [Lanternfish](https://adventofcode.com/2021/day/6) | [day06.py](src/day06.py) | [test_day06.py](tests/test_day06.py) |
| 7 | [The Treachery of Whales](https://adventofcode.com/2021/day/7) | [day07.py](src/day07.py) | [test_day07.py](tests/test_day07.py) |
| 8 | [Seven Segment Search](https://adventofcode.com/2021/day/8) | [day08.py](src/day08.py) | [test_day08.py](tests/test_day08.py) |
| 9 | [Smoke Basin](https://adventofcode.com/2021/day/9) | [day09.py](src/day09.py) | [test_day09.py](tests/test_day09.py) |
| 10 | [Syntax Scoring](https://adventofcode.com/2021/day/10) | [day10.py](src/day10.py) | [test_day10.py](tests/test_day10.py) |
| 11 | [Dumbo Octopus](https://adventofcode.com/2021/day/11) | [day11.py](src/day11.py) | [test_day11.py](tests/test_day11.py) |
| 12 | [Passage Pathing](https://adventofcode.com/2021/day/12) | [day12.py](src/day12.py) | [test_day12.py](tests/test_day12.py) |
| 13 | [Transparent Origami](https://adventofcode.com/2021/day/13) | [day13.py](src/day13.py) | [test_day13.py](tests/test_day13.py) |
| 14 | [Extended Polymerization](https://adventofcode.com/2021/day/14) | [day14.py](src/day14.py) | [test_day14.py](tests/test_day14.py) |
| 15 | [Chiton](https://adventofcode.com/2021/day/15) | [day15.py](src/day15.py) | [test_day15.py](tests/test_day15.py) |
| 16 | [Packet Decoder](https://adventofcode.com/2021/day/16) | [day16.py](src/day16.py) | [test_day16.py](tests/test_day16.py) |
| 17 | [Trick Shot](https://adventofcode.com/2021/day/17) | [day17.py](src/day17.py) | [test_day17.py](tests/test_day17.py) |
| 18 | [Snailfish](https://adventofcode.com/2021/day/18) | [day18.py](src/day18.py) | [test_day18.py](tests/test_day18.py) |
| 19 | [Beacon Scanner](https://adventofcode.com/2021/day/19) | [day19.py](src/day19.py) | [test_day19.py](tests/test_day19.py) |
| 20 | [Trench Map](https://adventofcode.com/2021/day/20) | [day20.py](src/day20.py) | [test_day20.py](tests/test_day20.py) |
| 21 | [Dirac Dice](https://adventofcode.com/2021/day/21) | [day21.py](src/day21.py) | [test_day21.py](tests/test_day21.py) |
| 22 | [Reactor Reboot](https://adventofcode.com/2021/day/22) | [day22.py](src/day22.py) | [test_day22.py](tests/test_day22.py) |
| 23 | [Amphipod](https://adventofcode.com/2021/day/23) | [day23.py](src/day23.py) | [test_day23.py](tests/test_day23.py) |
| 24 | [Arithmetic Logic Unit](https://adventofcode.com/2021/day/24) | [day24.py](src/day24.py) | [test_day24.py](tests/test_day24.py) |
| 25 | [Sea Cucumber](https://adventofcode.com/2021/day/25) | [day25.py](src/day25.py) | [test_day25.py](tests/test_day25.py) |
