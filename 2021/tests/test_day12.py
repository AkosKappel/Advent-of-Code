import unittest
from src import day12 as day

EXAMPLE1 = '../data/day12_example1.txt'
EXAMPLE2 = '../data/day12_example2.txt'
EXAMPLE3 = '../data/day12_example3.txt'
INPUT = '../data/day12.txt'


class TestDay12Part1(unittest.TestCase):
    def test_example1(self):
        self.assertEqual(day.part1(EXAMPLE1), 10)

    def test_example2(self):
        self.assertEqual(day.part1(EXAMPLE2), 19)

    def test_example3(self):
        self.assertEqual(day.part1(EXAMPLE3), 226)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 4773)


class TestDay12Part2(unittest.TestCase):
    def test_example1(self):
        self.assertEqual(day.part2(EXAMPLE1), 36)

    def test_example2(self):
        self.assertEqual(day.part2(EXAMPLE2), 103)

    def test_example3(self):
        self.assertEqual(day.part2(EXAMPLE3), 3509)

    def test_solution(self):
        self.assertEqual(day.part2(INPUT), 116985)
