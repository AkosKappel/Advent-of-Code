using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day11Test {
    private const string Example = "Inputs/11-Example.txt";
    private const string Example2 = "Inputs/11-Example2.txt";
    private const string Input = "Inputs/11.txt";
    private static Day11 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day11(Example);
            const string expected = "125681";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestExample2() {
            _day = new Day11(Example2);
            const string expected = "55312";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day11(Input);
            const string expected = "207683";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestExample() {
            _day = new Day11(Example);
            const string expected = "149161030616311";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestExample2() {
            _day = new Day11(Example2);
            const string expected = "65601038650482";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day11(Input);
            const string expected = "244782991106220";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}