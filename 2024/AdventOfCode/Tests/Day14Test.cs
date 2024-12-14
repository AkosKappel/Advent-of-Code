using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day14Test {
    private Day14 _day;

    [Test]
    public void TestPart1Example() {
        _day = new Day14("Inputs/14-Example.txt");
        var expected = "12";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input() {
        _day = new Day14("Inputs/14.txt");
        var expected = "208437768";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input() {
        _day = new Day14("Inputs/14.txt");
        var expected = "7492";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}