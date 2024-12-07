import unittest
from src import day16 as day

EXAMPLE1 = '../data/day16_examples1.txt'
EXAMPLE2 = '../data/day16_examples2.txt'
INPUT = '../data/day16.txt'


class TestDay16Part1(unittest.TestCase):
    def test_example1_row1(self):
        self.assertEqual(day.part1(EXAMPLE1, 0), 6)

    def test_example1_row2(self):
        self.assertEqual(day.part1(EXAMPLE1, 1), 9)

    def test_example1_row3(self):
        self.assertEqual(day.part1(EXAMPLE1, 2), 14)

    def test_example1_row4(self):
        self.assertEqual(day.part1(EXAMPLE1, 3), 16)

    def test_example1_row5(self):
        self.assertEqual(day.part1(EXAMPLE1, 4), 12)

    def test_example1_row6(self):
        self.assertEqual(day.part1(EXAMPLE1, 5), 23)

    def test_example1_row7(self):
        self.assertEqual(day.part1(EXAMPLE1, 6), 31)

    def test_solution(self):
        self.assertEqual(day.part1(INPUT), 977)


class TestDay16Part2(unittest.TestCase):
    def test_example2_row1(self):
        self.assertEqual(day.part2(EXAMPLE2, 0), 3)

    def test_example2_row2(self):
        self.assertEqual(day.part2(EXAMPLE2, 1), 54)

    def test_example2_row3(self):
        self.assertEqual(day.part2(EXAMPLE2, 2), 7)

    def test_example2_row4(self):
        self.assertEqual(day.part2(EXAMPLE2, 3), 9)

    def test_example2_row5(self):
        self.assertEqual(day.part2(EXAMPLE2, 4), 1)

    def test_example2_row6(self):
        self.assertEqual(day.part2(EXAMPLE2, 5), 0)

    def test_example2_row7(self):
        self.assertEqual(day.part2(EXAMPLE2, 6), 0)

    def test_example2_row8(self):
        self.assertEqual(day.part2(EXAMPLE2, 7), 1)

    def test_solution(self):
        self.assertEqual(day.part2(INPUT), 101501020883)
