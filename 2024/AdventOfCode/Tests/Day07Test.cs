using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day07Test {
    private const string Example = "Inputs/07-Example.txt";
    private const string Input = "Inputs/07.txt";
    private static Day07 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day07(Example);
            const string expected = "3749";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day07(Input);
            const string expected = "1260333054159";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestExample() {
            _day = new Day07(Example);
            const string expected = "11387";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day07(Input);
            const string expected = "162042343638683";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}