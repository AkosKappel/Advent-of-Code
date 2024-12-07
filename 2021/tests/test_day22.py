import unittest
from src import day22 as day

EXAMPLE1 = '../data/day22_example1.txt'
EXAMPLE2 = '../data/day22_example2.txt'
EXAMPLE3 = '../data/day22_example3.txt'
INPUT = '../data/day22.txt'


class TestDay22Part1(unittest.TestCase):
    def test_example1(self):
        self.assertEqual(day.part1(EXAMPLE1), 39)

    def test_example2(self):
        self.assertEqual(day.part1(EXAMPLE2), 590784)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 623748)


class TestDay22Part2(unittest.TestCase):
    def test_example3(self):
        self.assertEqual(day.part2(EXAMPLE3), 2758514936282235)

    def test_solution(self):
        self.assertEqual(day.part2(INPUT), 1227345351869476)
