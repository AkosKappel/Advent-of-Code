﻿using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day12Test {
    private const string Example = "Inputs/12-Example.txt";
    private const string Example2 = "Inputs/12-Example2.txt";
    private const string Example3 = "Inputs/12-Example3.txt";
    private const string Example4 = "Inputs/12-Example4.txt";
    private const string Example5 = "Inputs/12-Example5.txt";
    private const string Input = "Inputs/12.txt";
    private static Day12 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day12(Example);
            const string expected = "140";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestExample2() {
            _day = new Day12(Example2);
            const string expected = "772";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestExample3() {
            _day = new Day12(Example3);
            const string expected = "1930";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day12(Input);
            const string expected = "1449902";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestExample() {
            _day = new Day12(Example);
            const string expected = "80";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestExample2() {
            _day = new Day12(Example2);
            const string expected = "436";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestExample3() {
            _day = new Day12(Example3);
            const string expected = "1206";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestExample4() {
            _day = new Day12(Example4);
            const string expected = "236";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestExample5() {
            _day = new Day12(Example5);
            const string expected = "368";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day12(Input);
            const string expected = "908042";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}