using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day05Test {
    private const string Example = "Inputs/05-Example.txt";
    private const string Input = "Inputs/05.txt";
    private static Day05 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day05(Example);
            const string expected = "143";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day05(Input);
            const string expected = "4281";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestExample() {
            _day = new Day05(Example);
            const string expected = "123";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day05(Input);
            const string expected = "5466";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}