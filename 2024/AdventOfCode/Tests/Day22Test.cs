using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day22Test {
    private const string Example = "Inputs/22-Example.txt";
    private const string Example2 = "Inputs/22-Example2.txt";
    private const string Input = "Inputs/22.txt";
    private static Day22 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day22(Example);
            const string expected = "37327623";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day22(Input);
            const string expected = "13004408787";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestExample2() {
            _day = new Day22(Example2);
            const string expected = "23";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day22(Input);
            const string expected = "1455";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}