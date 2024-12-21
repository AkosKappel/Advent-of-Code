using System.Collections.Concurrent;

namespace AdventOfCode;

using Keypad = Dictionary<char, (int x, int y)>;

public class Day21 : BaseDay {
    private static readonly Keypad NumericKeypad = CreateKeypad(new[] {
        "789",
        "456",
        "123",
        " 0A",
    });

    private static readonly Keypad DirectionalKeypad = CreateKeypad(new[] {
        " ^A",
        "<v>",
    });

    private static readonly ConcurrentDictionary<(char, char, int), long> Memo = new();

    private readonly string[] _codes;
    public override string InputFilePath { get; } = "Inputs/21-Example.txt";

    public Day21() : this("") { }

    public Day21(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        _codes = ParseInput(inputFile);
    }

    private static string[] ParseInput(string file) => File.ReadAllText(file).ReplaceLineEndings("\n").Split("\n");

    private static Keypad CreateKeypad(string[] keypad) => keypad
        .SelectMany((row, y) => row.Select((c, x) => (c, x, y)))
        .Where(button => button.c != ' ')
        .ToDictionary(button => button.c, button => (button.x, button.y));


    private static long ShortestPath(Keypad keypad, char from, char to, int nDirectionalRobots, int? nRobots = null) {
        var key = (from, to, nDirectionalRobots);
        if (Memo.TryGetValue(key, out var cached)) return cached;

        var (sx, sy) = keypad[from];
        var (ex, ey) = keypad[to];

        if (nDirectionalRobots == 0) {
            Memo[key] = Math.Abs(sx - ex) + Math.Abs(sy - ey) + 1;
            return Memo[key];
        }

        var vertical = sy > ey
            ? new string('^', sy - ey)
            : new string('v', ey - sy);
        var horizontal = sx > ex
            ? new string('<', sx - ex)
            : new string('>', ex - sx);

        nRobots ??= nDirectionalRobots;

        var a = "A" + vertical + horizontal + "A";
        var b = "A" + horizontal + vertical + "A";

        var aCost = Enumerable.Range(0, a.Length - 1)
            .Sum(x => ShortestPath(DirectionalKeypad, a[x], a[x + 1], nDirectionalRobots - 1, nRobots));
        var bCost = Enumerable.Range(0, b.Length - 1)
            .Sum(x => ShortestPath(DirectionalKeypad, b[x], b[x + 1], nDirectionalRobots - 1, nRobots));

        Memo[key] = horizontal switch {
            // avoid falling off directional keypad
            "<<" when nDirectionalRobots != nRobots => aCost,
            // avoid falling off numeric keypad
            "<<" when nDirectionalRobots == nRobots && sy == keypad.Values.Max(pos => pos.y) => aCost,
            // falling is not an option
            _ => Math.Min(aCost, bCost)
        };

        return Memo[key];
    }

    private static long CalculateComplexity(string code, int n) {
        var numericPart = long.Parse(code.Replace("A", ""));

        code = "A" + code; // add starting position

        var shortestSequence = Enumerable
            .Range(0, code.Length - 1)
            .Select(x => ShortestPath(NumericKeypad, code[x], code[x + 1], nDirectionalRobots: n))
            .Sum();

        return shortestSequence * numericPart;
    }

    public override ValueTask<string> Solve_1() => new(
        _codes.Select(code => CalculateComplexity(code, 2)).Sum().ToString()
    );

    public override ValueTask<string> Solve_2() => new(
        _codes.Select(code => CalculateComplexity(code, 25)).Sum().ToString()
    );
}