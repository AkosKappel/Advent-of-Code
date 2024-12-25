using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day20Test {
    private const string Example = "Inputs/20-Example.txt";
    private const string Input = "Inputs/20.txt";
    private static Day20 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day20(Example);
            const string expected = "0";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day20(Input);
            const string expected = "1286";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestExample() {
            _day = new Day20(Example);
            const string expected = "0";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day20(Input);
            const string expected = "989316";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}