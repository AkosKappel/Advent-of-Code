using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day17Test {
    private Day17 _day;

    [Test]
    public void TestPart1Example() {
        _day = new Day17("Inputs/17-Example.txt");
        const string expected = "4,6,3,5,6,3,5,2,1,0";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input() {
        _day = new Day17("Inputs/17.txt");
        const string expected = "2,1,0,1,7,2,5,0,3";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example2() {
        _day = new Day17("Inputs/17-Example2.txt");
        const string expected = "117440";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input() {
        _day = new Day17("Inputs/17.txt");
        const string expected = "267265166222235";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}