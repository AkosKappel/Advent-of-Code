using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day08Test {
    private Day08 _day;

    [Test]
    public void TestPart1Example() {
        _day = new Day08("Inputs/08-Example.txt");
        const string expected = "14";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input() {
        _day = new Day08("Inputs/08.txt");
        const string expected = "344";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example() {
        _day = new Day08("Inputs/08-Example.txt");
        const string expected = "34";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example2() {
        _day = new Day08("Inputs/08-Example2.txt");
        const string expected = "9";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input() {
        _day = new Day08("Inputs/08.txt");
        const string expected = "1182";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}