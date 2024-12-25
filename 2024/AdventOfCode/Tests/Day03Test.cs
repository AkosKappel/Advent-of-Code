using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day03Test {
    private const string Example = "Inputs/03-Example.txt";
    private const string Example2 = "Inputs/03-Example2.txt";
    private const string Input = "Inputs/03.txt";
    private static Day03 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day03(Example);
            const string expected = "161";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day03(Input);
            const string expected = "184511516";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestExample() {
            _day = new Day03(Example2);
            const string expected = "48";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day03(Input);
            const string expected = "90044227";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}