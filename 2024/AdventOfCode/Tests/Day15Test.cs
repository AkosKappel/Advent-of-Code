using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day15Test
{
    private Day15 _day;

    [Test]
    public void TestPart1Example()
    {
        _day = new Day15("Inputs/15-Example.txt");
        const string expected = "10092";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Example2()
    {
        _day = new Day15("Inputs/15-Example2.txt");
        const string expected = "2028";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input()
    {
        _day = new Day15("Inputs/15.txt");
        const string expected = "1478649";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example()
    {
        _day = new Day15("Inputs/15-Example.txt");
        const string expected = "9021";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input()
    {
        _day = new Day15("Inputs/15.txt");
        const string expected = "0";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}