using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day09Test {
    private const string Example = "Inputs/09-Example.txt";
    private const string Input = "Inputs/09.txt";
    private static Day09 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day09(Example);
            const string expected = "1928";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day09(Input);
            const string expected = "6154342787400";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestExample() {
            _day = new Day09(Example);
            const string expected = "2858";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day09(Input);
            const string expected = "6183632723350";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}