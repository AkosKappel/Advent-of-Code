import unittest
from src import day14 as day

EXAMPLE = '../data/day14_example.txt'
INPUT = '../data/day14.txt'


class TestDay14Part1(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part1(EXAMPLE), 1588)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 2703)


class TestDay14Part2(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part2(EXAMPLE), 2188189693529)

    def test_solution(self):
        self.assertEqual(day.part2(INPUT), 2984946368465)
