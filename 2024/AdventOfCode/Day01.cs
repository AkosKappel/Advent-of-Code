﻿namespace AdventOfCode;

public class Day01 : BaseDay {
    private readonly List<int> _firstColumn;
    private readonly List<int> _secondColumn;
    // public override string InputFilePath { get; } = "Inputs/01-Example.txt";

    public Day01() : this("") { }

    public Day01(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        (_firstColumn, _secondColumn) = ParseInput(inputFile);
    }

    private static (List<int>, List<int>) ParseInput(string file) {
        var raw = File.ReadAllText(file).ReplaceLineEndings("\n");
        var pairs = raw.Split("\n").Select(line => line.Split("   ").Select(int.Parse).ToList()).ToList();
        var first = pairs.Select(pair => pair.First()).ToList();
        var second = pairs.Select(pair => pair.Last()).ToList();
        return (first, second);
    }

    public override ValueTask<string> Solve_1() {
        var distance = _firstColumn.Order().Zip(_secondColumn.Order(), (x, y) => Math.Abs(x - y)).Sum();
        return new(distance.ToString());
    }

    public override ValueTask<string> Solve_2() {
        // Count number of times each number appears in the second column
        var counts = _secondColumn
            .GroupBy(x => x)
            .ToDictionary(x => x.Key, x => x.Count());

        var similarity = _firstColumn.Select(item => item * counts.GetValueOrDefault(item, 0)).Sum();
        return new(similarity.ToString());
    }
}