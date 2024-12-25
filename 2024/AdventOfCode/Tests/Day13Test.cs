using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day13Test {
    private const string Example = "Inputs/13-Example.txt";
    private const string Input = "Inputs/13.txt";
    private static Day13 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day13(Example);
            const string expected = "480";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day13(Input);
            const string expected = "31897";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestExample() {
            _day = new Day13(Example);
            const string expected = "875318608908";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day13(Input);
            const string expected = "87596249540359";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}