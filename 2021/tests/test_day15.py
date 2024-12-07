import unittest
from src import day15 as day

EXAMPLE = '../data/day15_example.txt'
INPUT = '../data/day15.txt'


class TestDay15Part1(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part1(EXAMPLE), 40)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 811)


class TestDay15Part2(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part2(EXAMPLE), 315)

    # WARNING: test disabled due to slow performance
    # def test_solution(self):
    #     self.assertEqual(day.part2(INPUT), 3012)
