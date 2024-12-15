using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day13Test
{
    private Day13 _day;

    [Test]
    public void TestPart1Example()
    {
        _day = new Day13("Inputs/13-Example.txt");
        const string expected = "480";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input()
    {
        _day = new Day13("Inputs/13.txt");
        const string expected = "31897";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example()
    {
        _day = new Day13("Inputs/13-Example.txt");
        const string expected = "875318608908";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input()
    {
        _day = new Day13("Inputs/13.txt");
        const string expected = "87596249540359";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}