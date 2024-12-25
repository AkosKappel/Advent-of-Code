using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day06Test {
    private const string Example = "Inputs/06-Example.txt";
    private const string Input = "Inputs/06.txt";
    private static Day06 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day06(Example);
            const string expected = "41";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day06(Input);
            const string expected = "4778";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestExample() {
            _day = new Day06(Example);
            const string expected = "6";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day06(Input);
            const string expected = "1618";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}