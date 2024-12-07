namespace AdventOfCode;

public class Day07 : BaseDay {
    private readonly List<List<long>> _equations;

    public Day07() : this("") { }

    public Day07(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        _equations = ParseInput(inputFile);
    }

    private static List<List<long>> ParseInput(string file) => File
        .ReadAllText(file)
        .Split("\n")
        .Select(row => row.Replace(":", "").Split(" ").Select(long.Parse).ToList())
        .ToList();

    private static long Add(long a, long b) => a + b;
    private static long Multiply(long a, long b) => a * b;
    private static long Concatenate(long a, long b) => a * (long)Math.Pow(10, b.ToString().Length) + b;

    private static bool CanBeEqual(
        long target,
        long current,
        List<long> numbers,
        int index = 0,
        bool allowConcat = false
    ) {
        // base case
        if (current > target) return false; // overshooting the target
        if (index == numbers.Count) return current == target; // used up all numbers

        // recursive case
        return CanBeEqual(target, Add(current, numbers[index]), numbers, index + 1, allowConcat) ||
               CanBeEqual(target, Multiply(current, numbers[index]), numbers, index + 1, allowConcat) ||
               (allowConcat && CanBeEqual(target, Concatenate(current, numbers[index]), numbers, index + 1, true));
    }

    public override ValueTask<string> Solve_1() => new(_equations
        .Where(values => CanBeEqual(values.First(), values.Skip(1).First(), values.Skip(2).ToList()))
        .Select(values => values.First())
        .Sum()
        .ToString()
    );

    public override ValueTask<string> Solve_2() => new(_equations
        .Where(values =>
            CanBeEqual(values.First(), values.Skip(1).First(), values.Skip(2).ToList(), allowConcat: true))
        .Select(values => values.First())
        .Sum()
        .ToString()
    );
}