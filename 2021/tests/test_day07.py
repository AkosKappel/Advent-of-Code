import unittest
from src import day07 as day

EXAMPLE = '../data/day07_example.txt'
INPUT = '../data/day07.txt'


class TestDay07Part1(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part1(EXAMPLE), 37)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 343605)


class TestDay07Part2(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part2(EXAMPLE), 168)

    def test_solution(self):
        self.assertEqual(day.part2(INPUT), 96744904)
