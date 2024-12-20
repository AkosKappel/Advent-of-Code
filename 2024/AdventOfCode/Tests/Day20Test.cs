using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day20Test {
    private Day20 _day;

    [Test]
    public void TestPart1Example() {
        _day = new Day20("Inputs/20-Example.txt");
        const string expected = "0";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input() {
        _day = new Day20("Inputs/20.txt");
        const string expected = "1286";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example() {
        _day = new Day20("Inputs/20-Example.txt");
        const string expected = "0";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input() {
        _day = new Day20("Inputs/20.txt");
        const string expected = "989316";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}