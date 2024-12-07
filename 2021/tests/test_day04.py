import unittest
from src import day04 as day

EXAMPLE = '../data/day04_example.txt'
INPUT = '../data/day04.txt'


class TestDay04Part1(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part1(EXAMPLE), 4512)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 2496)


class TestDay04Part2(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part2(EXAMPLE), 1924)

    def test_solution(self):
        self.assertEqual(day.part2(INPUT), 25925)
