using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day15Test {
    private const string Example = "Inputs/15-Example.txt";
    private const string Example2 = "Inputs/15-Example2.txt";
    private const string Example3 = "Inputs/15-Example3.txt";
    private const string Input = "Inputs/15.txt";
    private static Day15 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day15(Example);
            const string expected = "10092";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestExample2() {
            _day = new Day15(Example2);
            const string expected = "2028";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day15(Input);
            const string expected = "1478649";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestExample() {
            _day = new Day15(Example);
            const string expected = "9021";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestExample2() {
            _day = new Day15(Example3);
            const string expected = "618";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day15(Input);
            const string expected = "1495455";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}