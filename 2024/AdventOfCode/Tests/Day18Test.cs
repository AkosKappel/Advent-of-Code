using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day18Test {
    private const string Example = "Inputs/18-Example.txt";
    private const string Input = "Inputs/18.txt";
    private static Day18 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day18(Example);
            const string expected = "22";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day18(Input);
            const string expected = "306";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestExample() {
            _day = new Day18(Example);
            const string expected = "6,1";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day18(Input);
            const string expected = "38,63";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}