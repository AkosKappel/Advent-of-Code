using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day19Test {
    private const string Example = "Inputs/19-Example.txt";
    private const string Input = "Inputs/19.txt";
    private static Day19 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day19(Example);
            const string expected = "6";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day19(Input);
            const string expected = "255";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestExample() {
            _day = new Day19(Example);
            const string expected = "16";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day19(Input);
            const string expected = "621820080273474";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}