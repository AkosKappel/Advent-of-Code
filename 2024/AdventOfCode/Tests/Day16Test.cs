using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day16Test {
    private const string Example = "Inputs/16-Example.txt";
    private const string Example2 = "Inputs/16-Example2.txt";
    private const string Input = "Inputs/16.txt";
    private static Day16 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day16(Example);
            const string expected = "7036";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestExample2() {
            _day = new Day16(Example2);
            const string expected = "11048";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day16(Input);
            const string expected = "89460";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestExample() {
            _day = new Day16(Example);
            const string expected = "45";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestExample2() {
            _day = new Day16(Example2);
            const string expected = "64";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day16(Input);
            const string expected = "504";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}