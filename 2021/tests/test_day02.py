import unittest
from src import day02 as day

EXAMPLE = '../data/day02_example.txt'
INPUT = '../data/day02.txt'


class TestDay02Part1(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part1(EXAMPLE), 150)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 1813801)


class TestDay02Part2(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part2(EXAMPLE), 900)

    def test_solution(self):
        self.assertEqual(day.part2(INPUT), 1960569556)
