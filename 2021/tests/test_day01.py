import unittest
from src import day01 as day

EXAMPLE = '../data/day01_example.txt'
INPUT = '../data/day01.txt'


class TestDay01Part1(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part1(EXAMPLE), 7)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 1616)


class TestDay01Part2(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part2(EXAMPLE), 5)

    def test_solution(self):
        self.assertEqual(day.part2(INPUT), 1645)
