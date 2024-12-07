import unittest
from src import day11 as day

EXAMPLE = '../data/day11_example.txt'
INPUT = '../data/day11.txt'


class TestDay11Part1(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part1(EXAMPLE), 1656)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 1691)


class TestDay11Part2(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part2(EXAMPLE), 195)

    def test_solution(self):
        self.assertEqual(day.part2(INPUT), 216)
