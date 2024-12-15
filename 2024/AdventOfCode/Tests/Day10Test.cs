using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day10Test {
    private Day10 _day;

    [Test]
    public void TestPart1Example() {
        _day = new Day10("Inputs/10-Example.txt");
        const string expected = "1";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Example2() {
        _day = new Day10("Inputs/10-Example2.txt");
        const string expected = "2";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Example3() {
        _day = new Day10("Inputs/10-Example3.txt");
        const string expected = "4";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Example4() {
        _day = new Day10("Inputs/10-Example4.txt");
        const string expected = "3";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Example5() {
        _day = new Day10("Inputs/10-Example5.txt");
        const string expected = "36";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input() {
        _day = new Day10("Inputs/10.txt");
        const string expected = "760";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example5() {
        _day = new Day10("Inputs/10-Example5.txt");
        const string expected = "81";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example6() {
        _day = new Day10("Inputs/10-Example6.txt");
        const string expected = "3";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example7() {
        _day = new Day10("Inputs/10-Example7.txt");
        const string expected = "13";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example8() {
        _day = new Day10("Inputs/10-Example8.txt");
        const string expected = "227";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input() {
        _day = new Day10("Inputs/10.txt");
        const string expected = "1764";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}