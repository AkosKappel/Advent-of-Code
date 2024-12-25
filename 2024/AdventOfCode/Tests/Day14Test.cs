using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day14Test {
    private const string Example = "Inputs/14-Example.txt";
    private const string Input = "Inputs/14.txt";
    private static Day14 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day14(Example);
            const string expected = "12";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day14(Input);
            const string expected = "208437768";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestInput() {
            _day = new Day14(Input);
            const string expected = "7492";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}