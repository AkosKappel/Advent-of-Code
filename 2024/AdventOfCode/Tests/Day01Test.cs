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
        var expected = "6";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input()
    {
        _day = new Day01("Inputs/01.txt");
        var expected = "15";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example()
    {
        _day = new Day01("Inputs/01-Example.txt");
        var expected = "6";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input()
    {
        _day = new Day01("Inputs/01.txt");
        var expected = "15";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}