using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day25Test {
    private Day25 _day;

    [Test]
    public void TestPart1Example() {
        _day = new Day25("Inputs/25-Example.txt");
        const string expected = "3";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input() {
        _day = new Day25("Inputs/25.txt");
        const string expected = "2840";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}