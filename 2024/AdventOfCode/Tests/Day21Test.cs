using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day21Test {
    private Day21 _day;

    [Test]
    public void TestPart1Example() {
        _day = new Day21("Inputs/21-Example.txt");
        const string expected = "126384";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input() {
        _day = new Day21("Inputs/21.txt");
        const string expected = "248108";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example() {
        _day = new Day21("Inputs/21-Example.txt");
        const string expected = "154115708116294";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input() {
        _day = new Day21("Inputs/21.txt");
        const string expected = "303836969158972";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}