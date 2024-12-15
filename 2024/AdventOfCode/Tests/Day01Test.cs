using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day01Test
{
    private Day01 _day;

    [Test]
    public void TestPart1Example()
    {
        _day = new Day01("Inputs/01-Example.txt");
        const string expected = "11";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input()
    {
        _day = new Day01("Inputs/01.txt");
        const string expected = "1151792";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example()
    {
        _day = new Day01("Inputs/01-Example.txt");
        const string expected = "31";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input()
    {
        _day = new Day01("Inputs/01.txt");
        const string expected = "21790168";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}