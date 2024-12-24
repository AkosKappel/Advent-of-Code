using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day24Test {
    private Day24 _day;

    [Test]
    public void TestPart1Example() {
        _day = new Day24("Inputs/24-Example.txt");
        const string expected = "4";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Example2() {
        _day = new Day24("Inputs/24-Example2.txt");
        const string expected = "2024";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input() {
        _day = new Day24("Inputs/24.txt");
        const string expected = "60714423975686";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example() {
        _day = new Day24("Inputs/24-Example.txt");
        const string expected = "";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input() {
        _day = new Day24("Inputs/24.txt");
        const string expected = "";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}