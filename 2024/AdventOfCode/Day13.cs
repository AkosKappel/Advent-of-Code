using System.Text.RegularExpressions;

namespace AdventOfCode;

public class Day13 : BaseDay {
    private record Coord(long X, long Y);

    private record Machine(Coord ButtonA, Coord ButtonB, Coord Prize);

    private readonly Machine[] _machines;
    // public override string InputFilePath { get; } = "Inputs/13-Example.txt";

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

    private static (long a, long b) PlayMachine(Machine m, int maxPushes = 100) {
        for (var k = 0; k <= maxPushes; k++) {
            for (var q = 0; q <= maxPushes; q++) {
                if (k * m.ButtonA.X + q * m.ButtonB.X == m.Prize.X &&
                    k * m.ButtonA.Y + q * m.ButtonB.Y == m.Prize.Y) {
                    return (k, q);
                }
            }
        }

        return (0, 0);
    }

    public override ValueTask<string> Solve_1() => new(
        _machines.Select(m => PlayMachine(m)).Sum(press => CalculatePrize(press.a, press.b)).ToString()
    );

    private static Machine[] IncreasePrize(Machine[] machines, long amount) => machines
        .Select(m => m with { Prize = new Coord(m.Prize.X + amount, m.Prize.Y + amount) }).ToArray();

    public override ValueTask<string> Solve_2() {
        // var machines = IncreasePrize(_machines, 10_000_000_000_000L);

        return new(0.ToString());
    }
}