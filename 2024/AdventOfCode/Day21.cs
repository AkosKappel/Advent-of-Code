namespace AdventOfCode;

using Keypad = (int width, int height, Dictionary<char, (int x, int y)> keys);

public class Day21 : BaseDay {
    private enum KeypadType {
        Numeric,
        Directional
    }

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

    private static readonly Dictionary<(char, char, KeypadType), IEnumerable<string>> PathMemo = new();
    private static readonly Dictionary<(string, int), long> LengthMemo = new();

    private readonly string[] _codes;

    public Day21() : this("") { }

    public Day21(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        _codes = ParseInput(inputFile);
    }

    private static string[] ParseInput(string file) => File.ReadAllText(file).ReplaceLineEndings("\n").Split("\n");

    private static Keypad CreateKeypad(string[] keypad) => (
        width: keypad.Max(row => row.Length),
        height: keypad.Length,
        keys: keypad
            .SelectMany((row, y) => row.Select((c, x) => (c, x, y)))
            .ToDictionary(button => button.c, button => (button.x, button.y))
    );

    private static IEnumerable<string> GetPaths(char start, char end, KeypadType type) {
        var key = (start, end, type);
        if (PathMemo.TryGetValue(key, out var cached)) return cached;

        var keypad = type switch {
            KeypadType.Numeric => NumericKeypad,
            KeypadType.Directional => DirectionalKeypad,
            _ => throw new ArgumentOutOfRangeException(nameof(type), type, null),
        };

        var (sx, sy) = keypad.keys[start];
        var (ex, ey) = keypad.keys[end];

        var visited = new HashSet<(int x, int y)> { (sx, sy), keypad.keys[' '] };

        var queue = new Queue<(int x, int y, string path)>();
        queue.Enqueue((sx, sy, string.Empty));

        var minDistance = int.MaxValue;
        var distance = 0;

        var paths = new List<string>();

        while (queue.TryDequeue(out var current) && distance <= minDistance) {
            var (x, y, path) = current;
            distance = path.Length;

            if (x == ex && y == ey) {
                minDistance = distance;
                paths.Add(path + 'A');
                continue;
            }

            foreach (var dir in Directions.Orthogonal) {
                var (newX, newY) = (x + (int)dir.X, y + (int)dir.Y);
                if (0 > newX || newX >= keypad.width || 0 > newY || newY >= keypad.height) continue;
                if (visited.Contains((newX, newY))) continue;

                queue.Enqueue((newX, newY, path + dir.ToCode(Directions.CodeType.Char)));
            }

            visited.Add((x, y));
        }

        PathMemo[key] = paths;
        return paths;
    }

    private static long ShortestPath(string sequence, int depth) {
        var key = (sequence, depth);
        if (LengthMemo.TryGetValue(key, out var cached)) return cached;

        if (depth <= 0) return sequence.Length;

        var length = 0L;
        var previous = 'A';

        foreach (var current in sequence) {
            var paths = GetPaths(previous, current, KeypadType.Directional);
            length += paths.Min(path => ShortestPath(path, depth - 1));
            previous = current;
        }

        LengthMemo[key] = length;
        return length;
    }

    private static long CalculateComplexity(string code, int depth) {
        var shortestSequenceLength = 0L;
        var previous = 'A';

        foreach (var current in code) {
            var paths = GetPaths(previous, current, KeypadType.Numeric);
            shortestSequenceLength += paths.Min(path => ShortestPath(path, depth));
            previous = current;
        }

        var numericPart = long.Parse(code.Replace("A", ""));
        return shortestSequenceLength * numericPart;
    }

    public override ValueTask<string> Solve_1() => new(
        _codes.Sum(code => CalculateComplexity(code, depth: 2)).ToString()
    );

    public override ValueTask<string> Solve_2() => new(
        _codes.Sum(code => CalculateComplexity(code, depth: 25)).ToString()
    );
}