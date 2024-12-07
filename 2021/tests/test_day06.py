import unittest
from src import day06 as day

EXAMPLE = '../data/day06_example.txt'
INPUT = '../data/day06.txt'


class TestDay06Part1(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part1(EXAMPLE), 5934)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 362740)


class TestDay06Part2(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part2(EXAMPLE), 26984457539)

    def test_solution(self):
        self.assertEqual(day.part2(INPUT), 1644874076764)
