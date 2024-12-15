using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day02Test
{
    private Day02 _day;

    [Test]
    public void TestPart1Example()
    {
        _day = new Day02("Inputs/02-Example.txt");
        const string expected = "2";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input()
    {
        _day = new Day02("Inputs/02.txt");
        const string expected = "421";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example()
    {
        _day = new Day02("Inputs/02-Example.txt");
        const string expected = "4";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input()
    {
        _day = new Day02("Inputs/02.txt");
        const string expected = "476";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}