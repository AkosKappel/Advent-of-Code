using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day10Test
{
    private Day10 _day;

    [Test]
    public void TestPart1Example()
    {
        _day = new Day10("Inputs/10-Example.txt");
        var expected = "11";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input()
    {
        _day = new Day10("Inputs/10.txt");
        var expected = "1151792";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example()
    {
        _day = new Day10("Inputs/10-Example.txt");
        var expected = "31";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input()
    {
        _day = new Day10("Inputs/10.txt");
        var expected = "21791068";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}