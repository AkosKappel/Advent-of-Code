using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day04Test
{
    private Day04 _day;

    [Test]
    public void TestPart1Example()
    {
        _day = new Day04("Inputs/04-Example.txt");
        const string expected = "18";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input()
    {
        _day = new Day04("Inputs/04.txt");
        const string expected = "2549";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example()
    {
        _day = new Day04("Inputs/04-Example.txt");
        const string expected = "9";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input()
    {
        _day = new Day04("Inputs/04.txt");
        const string expected = "2003";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}