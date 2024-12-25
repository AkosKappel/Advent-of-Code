using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day01Test {
    private const string Example = "Inputs/01-Example.txt";
    private const string Input = "Inputs/01.txt";
    private static Day01 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day01(Example);
            const string expected = "11";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day01(Input);
            const string expected = "1151792";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestExample() {
            _day = new Day01(Example);
            const string expected = "31";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day01(Input);
            const string expected = "21790168";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}