namespace AdventOfCode;

public class Day02 : BaseDay
{
    private readonly string _input;

    public Day02() : this("")
    {
    }

    public Day02(string filename)
    {
        _input = File.ReadAllText(string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename);
    }

    private IEnumerable<IEnumerable<int>> ParseInput() => _input.Split("\n")
        .Select(line => line.Split(" ").Select(int.Parse));

    private bool IsSafe(IEnumerable<int> row) => row.All(x => 1 <= x && x <= 3) ||
                                                 row.All(x => -3 <= x && x <= -1);

    private IEnumerable<int> GetDifferences(IEnumerable<int> row) => row.Zip(row.Skip(1), (x, y) => y - x);

    public override ValueTask<string> Solve_1()
    {
        var reports = ParseInput();
        var differences = reports.Select(GetDifferences);
        var numSafe = differences.Count(IsSafe);
        return new(numSafe.ToString());
    }

    public override ValueTask<string> Solve_2()
    {
        var reports = ParseInput();
        var numSafe = reports
            // Generate all possible subsequences with 1 element removed 
            .Select(report => report.Select((_, i) => report.Where((_, j) => i != j)))
            // Check if any of the subsequences is considered safe
            .Count(subsequences => subsequences.Select(GetDifferences).Any(IsSafe));
        return new(numSafe.ToString());
    }
}