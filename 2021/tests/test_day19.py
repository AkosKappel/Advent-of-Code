import unittest
from src import day19 as day

EXAMPLE = '../data/day19_example.txt'
INPUT = '../data/day19.txt'


# WARNING: commented tests take really long to run
class TestDay19Part1(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part1(EXAMPLE), 79)

    # def test_solution(self):
    #     self.assertEqual(day.part1(INPUT), 428)

class TestDay19Part2(unittest.TestCase):
    def test_example(self):
        self.assertEqual(day.part2(EXAMPLE), 3621)

#     def test_solution(self):
#         self.assertEqual(day.part2(INPUT), 12140)
