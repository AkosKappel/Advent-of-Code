import unittest
from src import day18 as day

EXAMPLE1 = '../data/day18_example1.txt'
EXAMPLE2 = '../data/day18_example2.txt'
EXAMPLE3 = '../data/day18_example3.txt'
EXAMPLE4 = '../data/day18_example4.txt'
EXAMPLE5 = '../data/day18_example5.txt'
INPUT = '../data/day18.txt'


class TestDay18Part1(unittest.TestCase):
    def test_example1(self):
        self.assertEqual(day.part1(EXAMPLE1), 445)

    def test_example2(self):
        self.assertEqual(day.part1(EXAMPLE2), 791)

    def test_example3(self):
        self.assertEqual(day.part1(EXAMPLE3), 1137)

    def test_example4(self):
        self.assertEqual(day.part1(EXAMPLE4), 3488)

    def test_example5(self):
        self.assertEqual(day.part1(EXAMPLE5), 4140)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 4120)


class TestDay18Part2(unittest.TestCase):
    def test_example5(self):
        self.assertEqual(day.part2(EXAMPLE5), 3993)

    def test_solution(self):
        self.assertEqual(day.part2(INPUT), 4725)
