import unittest
from src import day21 as day

EXAMPLE = '../data/day21_example.txt'
INPUT = '../data/day21.txt'


class TestDay21Part1(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part1(EXAMPLE), 739785)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 503478)


class TestDay21Part2(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part2(EXAMPLE), 444356092776315)

    def test_solution(self):
        self.assertEqual(day.part2(INPUT), 716241959649754)
