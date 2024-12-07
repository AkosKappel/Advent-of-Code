import unittest
from src import day03 as day

EXAMPLE = '../data/day03_example.txt'
INPUT = '../data/day03.txt'


class TestDay03Part1(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part1(EXAMPLE), 198)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 2250414)


class TestDay03Part2(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part2(EXAMPLE), 230)

    def test_solution(self):
        self.assertEqual(day.part2(INPUT), 6085575)
