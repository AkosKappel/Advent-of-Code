using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day23Test {
    private Day23 _day;

    [Test]
    public void TestPart1Example() {
        _day = new Day23("Inputs/23-Example.txt");
        const string expected = "7";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input() {
        _day = new Day23("Inputs/23.txt");
        const string expected = "1154";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example() {
        _day = new Day23("Inputs/23-Example.txt");
        const string expected = "";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input() {
        _day = new Day23("Inputs/23.txt");
        const string expected = "";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}