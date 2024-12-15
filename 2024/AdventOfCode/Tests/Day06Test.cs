using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day06Test
{
    private Day06 _day;

    [Test]
    public void TestPart1Example()
    {
        _day = new Day06("Inputs/06-Example.txt");
        const string expected = "41";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input()
    {
        _day = new Day06("Inputs/06.txt");
        const string expected = "4778";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example()
    {
        _day = new Day06("Inputs/06-Example.txt");
        const string expected = "6";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input()
    {
        _day = new Day06("Inputs/06.txt");
        const string expected = "1618";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}