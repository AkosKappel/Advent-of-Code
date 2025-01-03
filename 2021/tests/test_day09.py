import unittest
from src import day09 as day

EXAMPLE = '../data/day09_example.txt'
INPUT = '../data/day09.txt'


class TestDay09Part1(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part1(EXAMPLE), 15)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 560)


class TestDay09Part2(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part2(EXAMPLE), 1134)

    def test_solution(self):
        self.assertEqual(day.part2(INPUT), 959136)
