using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day09Test {
    private Day09 _day;

    [Test]
    public void TestPart1Example() {
        _day = new Day09("Inputs/09-Example.txt");
        const string expected = "1928";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input() {
        _day = new Day09("Inputs/09.txt");
        const string expected = "6154342787400";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example() {
        _day = new Day09("Inputs/09-Example.txt");
        const string expected = "2858";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input() {
        _day = new Day09("Inputs/09.txt");
        const string expected = "6183632723350";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}