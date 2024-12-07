import unittest
from src import day20 as day

EXAMPLE1 = '../data/day20_example1.txt'
EXAMPLE2 = '../data/day20_example2.txt'
INPUT = '../data/day20.txt'


class TestDay20Part1(unittest.TestCase):
    def test_example1(self):
        self.assertEqual(day.part1(EXAMPLE1), 35)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 5573)


class TestDay20Part2(unittest.TestCase):
    def test_example1(self):
        self.assertEqual(day.part2(EXAMPLE1), 3351)

    def test_solution(self):
        self.assertEqual(day.part2(INPUT), 20097)
