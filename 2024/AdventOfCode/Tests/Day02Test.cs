using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day02Test {
    private const string Example = "Inputs/02-Example.txt";
    private const string Input = "Inputs/02.txt";
    private static Day02 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day02(Example);
            const string expected = "2";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day02(Input);
            const string expected = "421";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestExample() {
            _day = new Day02(Example);
            const string expected = "4";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day02(Input);
            const string expected = "476";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}