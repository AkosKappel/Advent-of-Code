import unittest
from src import day25 as day

EXAMPLE1 = '../data/day25_example1.txt'
EXAMPLE2 = '../data/day25_example2.txt'
INPUT = '../data/day25.txt'


class TestDay25Part1(unittest.TestCase):
    def test_example1(self):
        self.assertEqual(day.part1(EXAMPLE1), 58)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 329)
