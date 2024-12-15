using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day11Test {
    private Day11 _day;

    [Test]
    public void TestPart1Example() {
        _day = new Day11("Inputs/11-Example.txt");
        const string expected = "125681";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Example2() {
        _day = new Day11("Inputs/11-Example2.txt");
        const string expected = "55312";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input() {
        _day = new Day11("Inputs/11.txt");
        const string expected = "207683";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example() {
        _day = new Day11("Inputs/11-Example.txt");
        const string expected = "149161030616311";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example2() {
        _day = new Day11("Inputs/11-Example2.txt");
        const string expected = "65601038650482";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input() {
        _day = new Day11("Inputs/11.txt");
        const string expected = "244782991106220";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}