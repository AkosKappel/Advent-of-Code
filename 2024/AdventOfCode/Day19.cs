namespace AdventOfCode;

public class Day19 : BaseDay {
    private readonly string[] _availablePatterns;
    private readonly string[] _designPatterns;

    public Day19() : this("") { }

    public Day19(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        (_availablePatterns, _designPatterns) = ParseInput(inputFile);
    }

    private static (string[], string[]) ParseInput(string file) {
        var parts = File.ReadAllText(file).ReplaceLineEndings("\n").Split("\n\n");
        return (parts[0].Split(", "), parts[1].Split("\n"));
    }

    private static long CountPossible(string target, string[] available, Dictionary<string, long> memo = null) {
        memo ??= new();

        if (memo.TryGetValue(target, out var result)) return result;
        if (target.Length == 0) return 1;

        var count = available
            .Where(target.StartsWith)
            .Sum(pattern => CountPossible(target[pattern.Length..], available, memo));

        memo.TryAdd(target, count);
        return count;
    }

    public override ValueTask<string> Solve_1() => new(
        _designPatterns.Count(pattern => CountPossible(pattern, _availablePatterns) > 0).ToString()
    );

    public override ValueTask<string> Solve_2() => new(
        _designPatterns.Sum(pattern => CountPossible(pattern, _availablePatterns)).ToString()
    );
}