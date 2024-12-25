using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day25Test {
    private const string Example = "Inputs/25-Example.txt";
    private const string Input = "Inputs/25.txt";
    private static Day25 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day25(Example);
            const string expected = "3";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day25(Input);
            const string expected = "2840";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}