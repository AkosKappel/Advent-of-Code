using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day16Test {
    private Day16 _day;

    [Test]
    public void TestPart1Example() {
        _day = new Day16("Inputs/16-Example.txt");
        const string expected = "7036";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Example2() {
        _day = new Day16("Inputs/16-Example2.txt");
        const string expected = "11048";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input() {
        _day = new Day16("Inputs/16.txt");
        const string expected = "89460";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example() {
        _day = new Day16("Inputs/16-Example.txt");
        const string expected = "45";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example2() {
        _day = new Day16("Inputs/16-Example2.txt");
        const string expected = "64";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input() {
        _day = new Day16("Inputs/16.txt");
        const string expected = "504";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}