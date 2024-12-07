import unittest
from src import day23 as day

EXAMPLE = '../data/day23_example.txt'
INPUT = '../data/day23.txt'


class TestDay23Part1(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part1(EXAMPLE), 12521)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 15299)


class TestDay23Part2(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part2(EXAMPLE), 44169)

    def test_solution(self):
        self.assertEqual(day.part2(INPUT), 47193)
