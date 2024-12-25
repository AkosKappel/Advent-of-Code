using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day21Test {
    private const string Example = "Inputs/21-Example.txt";
    private const string Input = "Inputs/21.txt";
    private static Day21 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day21(Example);
            const string expected = "126384";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day21(Input);
            const string expected = "248108";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestExample() {
            _day = new Day21(Example);
            const string expected = "154115708116294";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day21(Input);
            const string expected = "303836969158972";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}