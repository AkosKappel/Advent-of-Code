using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day22Test {
    private Day22 _day;

    [Test]
    public void TestPart1Example() {
        _day = new Day22("Inputs/22-Example.txt");
        const string expected = "37327623";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input() {
        _day = new Day22("Inputs/22.txt");
        const string expected = "13004408787";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example() {
        _day = new Day22("Inputs/22-Example.txt");
        const string expected = "";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input() {
        _day = new Day22("Inputs/22.txt");
        const string expected = "";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}