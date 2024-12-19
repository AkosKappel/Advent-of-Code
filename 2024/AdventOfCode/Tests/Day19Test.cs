using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day19Test {
    private Day19 _day;

    [Test]
    public void TestPart1Example() {
        _day = new Day19("Inputs/19-Example.txt");
        const string expected = "6";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input() {
        _day = new Day19("Inputs/19.txt");
        const string expected = "255";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example() {
        _day = new Day19("Inputs/19-Example.txt");
        const string expected = "16";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input() {
        _day = new Day19("Inputs/19.txt");
        const string expected = "621820080273474";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}