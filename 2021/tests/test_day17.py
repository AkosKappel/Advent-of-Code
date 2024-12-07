import unittest
from src import day17 as day

EXAMPLE = '../data/day17_example.txt'
INPUT = '../data/day17.txt'


class TestDay17Part1(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part1(EXAMPLE), 45)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 3570)


class TestDay17Part2(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part2(EXAMPLE), 112)

    def test_solution(self):
        self.assertEqual(day.part2(INPUT), 1919)
