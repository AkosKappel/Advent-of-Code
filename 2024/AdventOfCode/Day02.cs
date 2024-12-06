namespace AdventOfCode;

public class Day02 : BaseDay {
    private readonly List<List<int>> _reports;

    public Day02() : this("") { }

    public Day02(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        _reports = ParseInput(inputFile);
    }

    private static List<List<int>> ParseInput(string file) => File
        .ReadAllText(file)
        .Split("\n")
        .Select(line => line.Split(" ").Select(int.Parse).ToList())
        .ToList();

    private static bool IsSafe(List<int> row) => row.All(x => x is >= 1 and <= 3) ||
                                                 row.All(x => x is >= -3 and <= -1);

    private static List<int> GetDifferences(List<int> row) => row.Zip(row.Skip(1), (x, y) => y - x).ToList();

    public override ValueTask<string> Solve_1() => new(_reports
        .Select(GetDifferences)
        .Count(IsSafe)
        .ToString()
    );

    public override ValueTask<string> Solve_2() => new(_reports
        // Generate all possible subsequences with 1 element removed 
        .Select(report => report.Select((_, i) => report.Where((_, j) => i != j)))
        // Check if any of the subsequences is considered safe
        .Count(subsequences => subsequences
            .Select(sub => GetDifferences(sub.ToList())).Any(IsSafe))
        .ToString()
    );
}