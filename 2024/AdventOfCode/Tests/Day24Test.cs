using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day24Test {
    private const string Example = "Inputs/24-Example.txt";
    private const string Example2 = "Inputs/24-Example2.txt";
    private const string Input = "Inputs/24.txt";
    private static Day24 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day24(Example);
            const string expected = "4";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestExample2() {
            _day = new Day24(Example2);
            const string expected = "2024";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day24(Input);
            const string expected = "60714423975686";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestInput() {
            _day = new Day24(Input);
            const string expected = "cgh,frt,pmd,sps,tst,z05,z11,z23";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}