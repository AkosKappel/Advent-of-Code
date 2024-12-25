using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day08Test {
    private const string Example = "Inputs/08-Example.txt";
    private const string Example2 = "Inputs/08-Example2.txt";
    private const string Input = "Inputs/08.txt";
    private static Day08 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day08(Example);
            const string expected = "14";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day08(Input);
            const string expected = "344";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestExample() {
            _day = new Day08(Example);
            const string expected = "34";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestExample2() {
            _day = new Day08(Example2);
            const string expected = "9";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day08(Input);
            const string expected = "1182";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}