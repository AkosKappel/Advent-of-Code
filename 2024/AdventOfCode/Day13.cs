using System.Text.RegularExpressions;

namespace AdventOfCode;

public class Day13 : BaseDay {
    private record Coord(long X, long Y);

    private record Machine(Coord ButtonA, Coord ButtonB, Coord Prize);

    private readonly Machine[] _machines;

    public Day13() : this("") { }

    public Day13(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        _machines = ParseInput(inputFile);
    }

    private static Machine[] ParseInput(string file) {
        var chunks = File.ReadAllText(file).ReplaceLineEndings("\n").Split("\n\n");
        var regex = new Regex(
            @"Button (?<button>[A-B]): X(?<x>[+-]?\d+), Y(?<y>[+-]?\d+)|Prize: X=(?<px>[+-]?\d+), Y=(?<py>[+-]?\d+)",
            RegexOptions.Multiline
        );
        return chunks.Select(chunk => {
            var matches = regex.Matches(chunk).ToList();
            return new Machine(
                new Coord(long.Parse(matches[0].Groups["x"].Value), long.Parse(matches[0].Groups["y"].Value)),
                new Coord(long.Parse(matches[1].Groups["x"].Value), long.Parse(matches[1].Groups["y"].Value)),
                new Coord(long.Parse(matches[2].Groups["px"].Value), long.Parse(matches[2].Groups["py"].Value))
            );
        }).ToArray();
    }

    private static long CalculatePrize(long k, long q) => 3 * k + q;

    private static bool InRange(long value, long min, long max) => min <= value && value <= max;

    private static Machine[] IncreasePrize(Machine[] machines, long amount) => machines
        .Select(m => m with { Prize = new Coord(m.Prize.X + amount, m.Prize.Y + amount) }).ToArray();

    private static (long a, long b) SolveLinearEquation(long ax, long ay, long bx, long by, long px, long py) {
        var det = ax * by - ay * bx;
        var x = px * by - py * bx;
        var y = ax * py - ay * px;

        if (x % det != 0 || y % det != 0) return (0, 0);
        return (x / det, y / det);
    }

    public override ValueTask<string> Solve_1() => new(
        _machines
            .Select(m => SolveLinearEquation(
                m.ButtonA.X, m.ButtonA.Y,
                m.ButtonB.X, m.ButtonB.Y,
                m.Prize.X, m.Prize.Y
            ))
            .Where(press => InRange(press.a, 0, 100) && InRange(press.b, 0, 100))
            .Sum(press => CalculatePrize(press.a, press.b))
            .ToString()
    );

    public override ValueTask<string> Solve_2() => new(
        IncreasePrize(_machines, 10_000_000_000_000L)
            .Select(m => SolveLinearEquation(
                m.ButtonA.X, m.ButtonA.Y,
                m.ButtonB.X, m.ButtonB.Y,
                m.Prize.X, m.Prize.Y
            ))
            .Sum(press => CalculatePrize(press.a, press.b))
            .ToString()
    );
}