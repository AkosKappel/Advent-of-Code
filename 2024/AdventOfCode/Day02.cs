namespace AdventOfCode;

public class Day02 : BaseDay {
    private readonly IEnumerable<IEnumerable<int>> _reports;

    public Day02() : this("") { }

    public Day02(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        _reports = ParseInput(inputFile);
    }

    private static IEnumerable<IEnumerable<int>> ParseInput(string file) => File
        .ReadAllText(file)
        .Split("\n")
        .Select(line => line.Split(" ").Select(int.Parse));

    private static bool IsSafe(IEnumerable<int> row) => row.All(x => x is >= 1 and <= 3) ||
                                                        row.All(x => x is >= -3 and <= -1);

    private static IEnumerable<int> GetDifferences(IEnumerable<int> row) => row.Zip(row.Skip(1), (x, y) => y - x);

    public override ValueTask<string> Solve_1() => new(_reports
        .Select(GetDifferences)
        .Count(IsSafe)
        .ToString()
    );

    public override ValueTask<string> Solve_2() => new(_reports
        // Generate all possible subsequences with 1 element removed 
        .Select(report => report.Select((_, i) => report.Where((_, j) => i != j)))
        // Check if any of the subsequences is considered safe
        .Count(subsequences => subsequences.Select(GetDifferences).Any(IsSafe))
        .ToString()
    );
}