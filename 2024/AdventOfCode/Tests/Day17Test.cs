using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day17Test {
    private const string Example = "Inputs/17-Example.txt";
    private const string Example2 = "Inputs/17-Example2.txt";
    private const string Input = "Inputs/17.txt";
    private static Day17 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day17(Example);
            const string expected = "4,6,3,5,6,3,5,2,1,0";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day17(Input);
            const string expected = "2,1,0,1,7,2,5,0,3";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestExample2() {
            _day = new Day17(Example2);
            const string expected = "117440";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day17(Input);
            const string expected = "267265166222235";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}