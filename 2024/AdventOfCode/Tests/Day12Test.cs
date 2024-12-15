using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day12Test {
    private Day12 _day;

    [Test]
    public void TestPart1Example() {
        _day = new Day12("Inputs/12-Example.txt");
        const string expected = "140";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Example2() {
        _day = new Day12("Inputs/12-Example2.txt");
        const string expected = "772";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Example3() {
        _day = new Day12("Inputs/12-Example3.txt");
        const string expected = "1930";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input() {
        _day = new Day12("Inputs/12.txt");
        const string expected = "1449902";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example() {
        _day = new Day12("Inputs/12-Example.txt");
        const string expected = "80";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example2() {
        _day = new Day12("Inputs/12-Example2.txt");
        const string expected = "436";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example3() {
        _day = new Day12("Inputs/12-Example3.txt");
        const string expected = "1206";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example4() {
        _day = new Day12("Inputs/12-Example4.txt");
        const string expected = "236";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example5() {
        _day = new Day12("Inputs/12-Example5.txt");
        const string expected = "368";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input() {
        _day = new Day12("Inputs/12.txt");
        const string expected = "908042";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}