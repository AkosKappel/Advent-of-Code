using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day03Test
{
    private Day03 _day;

    [Test]
    public void TestPart1Example()
    {
        _day = new Day03("Inputs/03-Example.txt");
        var expected = "161";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input()
    {
        _day = new Day03("Inputs/03.txt");
        var expected = "184511516";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example()
    {
        _day = new Day03("Inputs/03-Example.txt");
        var expected = "48";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input()
    {
        _day = new Day03("Inputs/03.txt");
        var expected = "90044227";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}