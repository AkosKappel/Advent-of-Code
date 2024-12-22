﻿using NUnit.Framework;

namespace AdventOfCode.Tests;

[TestFixture]
public class Day18Test {
    private Day18 _day;

    [Test]
    public void TestPart1Example() {
        _day = new Day18("Inputs/18-Example.txt");
        const string expected = "22";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart1Input() {
        _day = new Day18("Inputs/18.txt");
        const string expected = "306";
        var solution = _day.Solve_1();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Example() {
        _day = new Day18("Inputs/18-Example.txt");
        const string expected = "6,1";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }

    [Test]
    public void TestPart2Input() {
        _day = new Day18("Inputs/18.txt");
        const string expected = "38,63";
        var solution = _day.Solve_2();
        Assert.That(solution.Result, Is.EqualTo(expected));
    }
}