using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day10Test {
    private const string Example = "Inputs/10-Example.txt";
    private const string Example2 = "Inputs/10-Example2.txt";
    private const string Example3 = "Inputs/10-Example3.txt";
    private const string Example4 = "Inputs/10-Example4.txt";
    private const string Example5 = "Inputs/10-Example5.txt";
    private const string Example6 = "Inputs/10-Example6.txt";
    private const string Example7 = "Inputs/10-Example7.txt";
    private const string Example8 = "Inputs/10-Example8.txt";
    private const string Input = "Inputs/10.txt";
    private static Day10 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day10(Example);
            const string expected = "1";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestExample2() {
            _day = new Day10(Example2);
            const string expected = "2";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestExample3() {
            _day = new Day10(Example3);
            const string expected = "4";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestExample4() {
            _day = new Day10(Example4);
            const string expected = "3";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestExample5() {
            _day = new Day10(Example5);
            const string expected = "36";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day10(Input);
            const string expected = "760";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestExample5() {
            _day = new Day10(Example5);
            const string expected = "81";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestExample6() {
            _day = new Day10(Example6);
            const string expected = "3";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestExample7() {
            _day = new Day10(Example7);
            const string expected = "13";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestExample8() {
            _day = new Day10(Example8);
            const string expected = "227";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day10(Input);
            const string expected = "1764";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}