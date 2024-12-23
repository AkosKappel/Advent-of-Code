import unittest
from src import day24 as day

EXAMPLE1 = '../data/day24_example1.txt'
EXAMPLE2 = '../data/day24_example2.txt'
EXAMPLE3 = '../data/day24_example3.txt'
INPUT = '../data/day24.txt'


class TestDay24Part1(unittest.TestCase):
    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 29991993698469)


class TestDay24Part2(unittest.TestCase):
    def test_solution(self):
        self.assertEqual(day.part2(INPUT), 14691271141118)
