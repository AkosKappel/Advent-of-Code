import unittest
from src import day13 as day

EXAMPLE = '../data/day13_example.txt'
INPUT = '../data/day13.txt'


class TestDay13Part1(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part1(EXAMPLE), 17)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 695)


class TestDay13Part2(unittest.TestCase):
    def test_solution(self):
        text = """
.##....##.####..##..#....#..#.###....##.
#..#....#....#.#..#.#....#..#.#..#....#.
#.......#...#..#....#....#..#.#..#....#.
#.##....#..#...#.##.#....#..#.###.....#.
#..#.#..#.#....#..#.#....#..#.#....#..#.
.###..##..####..###.####..##..#.....##..
""".strip()
        self.assertEqual(day.part2(INPUT), text)
