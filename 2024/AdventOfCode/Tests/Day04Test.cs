using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day04Test {
    private const string Example = "Inputs/04-Example.txt";
    private const string Input = "Inputs/04.txt";
    private static Day04 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day04(Example);
            const string expected = "18";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day04(Input);
            const string expected = "2549";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestExample() {
            _day = new Day04(Example);
            const string expected = "9";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day04(Input);
            const string expected = "2003";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}