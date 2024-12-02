namespace AdventOfCode;

public class Day02 : BaseDay
{
    private readonly string _input;
    public override string InputFilePath { get; } = "Inputs/02-Example.txt";

    public Day02() : this(null) { }
    public Day02(string? filename)
    {
        _input = File.ReadAllText(filename ?? InputFilePath);
    }

    private IEnumerable<IEnumerable<int>> ParseInput() => _input.Split("\n")
        .Select(line => line.Split(" ").Select(int.Parse));
    
    public override ValueTask<string> Solve_1()
    {
        var reports = ParseInput();
        var differences = reports
            .Select(row => row.Skip(1).Zip(row, (x, y) => y - x));
        var count = differences.Count(row => 
            row.All(x => 1 <= x && x <= 3) ||
            row.All(x => -3 <= x && x <= -1)
        );
        return new(count.ToString());
    }

    public override ValueTask<string> Solve_2()
    {
        return new("");
    }
}