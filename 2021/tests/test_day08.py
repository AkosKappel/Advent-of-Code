import unittest
from src import day08 as day

EXAMPLE = '../data/day08_example.txt'
INPUT = '../data/day08.txt'


class TestDay08Part1(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part1(EXAMPLE), 26)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 274)


class TestDay08Part2(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part2(EXAMPLE), 61229)

    def test_solution(self):
        self.assertEqual(day.part2(INPUT), 1012089)
