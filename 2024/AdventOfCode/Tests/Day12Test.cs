using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day12Test {
    private Day12 _day;

    [Test]
    public void TestPart1Example() {
        _day = new Day12("Inputs/12-Example.txt");
        var expected = "140";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Example2() {
        _day = new Day12("Inputs/12-Example2.txt");
        var expected = "772";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Example3() {
        _day = new Day12("Inputs/12-Example3.txt");
        var expected = "1930";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input() {
        _day = new Day12("Inputs/12.txt");
        var expected = "1449902";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example() {
        _day = new Day12("Inputs/12-Example.txt");
        var expected = "80";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example2() {
        _day = new Day12("Inputs/12-Example2.txt");
        var expected = "436";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example3() {
        _day = new Day12("Inputs/12-Example3.txt");
        var expected = "1206";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example4() {
        _day = new Day12("Inputs/12-Example4.txt");
        var expected = "236";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example5() {
        _day = new Day12("Inputs/12-Example5.txt");
        var expected = "368";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input() {
        _day = new Day12("Inputs/12.txt");
        var expected = "908042";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}