import unittest
from src import day10 as day

EXAMPLE = '../data/day10_example.txt'
INPUT = '../data/day10.txt'


class TestDay10Part1(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part1(EXAMPLE), 26397)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 323691)


class TestDay10Part2(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part2(EXAMPLE), 288957)

    def test_solution(self):
        self.assertEqual(day.part2(INPUT), 2858785164)
