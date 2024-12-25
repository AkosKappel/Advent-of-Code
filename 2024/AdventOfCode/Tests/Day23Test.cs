using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day23Test {
    private const string Example = "Inputs/23-Example.txt";
    private const string Input = "Inputs/23.txt";
    private static Day23 _day;

    [TestFixture]
    public class Part1 {
        [Test]
        public void TestExample() {
            _day = new Day23(Example);
            const string expected = "7";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day23(Input);
            const string expected = "1154";
            var solution = _day.Solve_1();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }

    [TestFixture]
    public class Part2 {
        [Test]
        public void TestExample() {
            _day = new Day23(Example);
            const string expected = "co,de,ka,ta";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }

        [Test]
        public void TestInput() {
            _day = new Day23(Input);
            const string expected = "aj,ds,gg,id,im,jx,kq,nj,ql,qr,ua,yh,zn";
            var solution = _day.Solve_2();
            Assert.That(solution.Result, Is.EqualTo(expected));
        }
    }
}