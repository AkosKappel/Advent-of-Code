import unittest
from src import day05 as day

EXAMPLE = '../data/day05_example.txt'
INPUT = '../data/day05.txt'


class TestDay05Part1(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part1(EXAMPLE), 5)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 4826)


class TestDay05Part2(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part2(EXAMPLE), 12)

    def test_solution(self):
        self.assertEqual(day.part2(INPUT), 16793)
