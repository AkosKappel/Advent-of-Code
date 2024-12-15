using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day05Test {
    private Day05 _day;

    [Test]
    public void TestPart1Example() {
        _day = new Day05("Inputs/05-Example.txt");
        const string expected = "143";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input() {
        _day = new Day05("Inputs/05.txt");
        const string expected = "4281";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example() {
        _day = new Day05("Inputs/05-Example.txt");
        const string expected = "123";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input() {
        _day = new Day05("Inputs/05.txt");
        const string expected = "5466";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}