using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day07Test
{
    private Day07 _day;

    [Test]
    public void TestPart1Example()
    {
        _day = new Day07("Inputs/07-Example.txt");
        var expected = "3749";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input()
    {
        _day = new Day07("Inputs/07.txt");
        var expected = "1260333054159";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example()
    {
        _day = new Day07("Inputs/07-Example.txt");
        var expected = "11387";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input()
    {
        _day = new Day07("Inputs/07.txt");
        var expected = "162042343638683";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}