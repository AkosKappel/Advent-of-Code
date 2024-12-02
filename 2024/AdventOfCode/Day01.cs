namespace AdventOfCode;

public class Day01 : BaseDay
{
    private readonly string _input;

    public Day01() : this(null) { }
    public Day01(string? filename)
    {
        _input = File.ReadAllText(filename ?? InputFilePath);
    }

    private (IEnumerable<int>, IEnumerable<int>) ParseInput()
    {
        var pairs = _input.Split("\n").Select(line => line.Split("   ").Select(int.Parse));
        var firstColumn = pairs.Select(pair => pair.First());
        var secondColumn = pairs.Select(pair => pair.Last());
        return (firstColumn, secondColumn);
    }

    public override ValueTask<string> Solve_1()
    {
        var (firstColumn, secondColumn) = ParseInput();
        var distance = firstColumn.Order().Zip(secondColumn.Order(), (x, y) => Math.Abs(x - y)).Sum();
        return new(distance.ToString());
    }

    public override ValueTask<string> Solve_2()
    {
        var (firstColumn, secondColumn) = ParseInput();

        // Count number of times each number appears in the second column
        var counts = secondColumn
            .GroupBy(x => x)
            .ToDictionary(x => x.Key, x => x.Count());

        var similarity = firstColumn.Select(item => item * counts.GetValueOrDefault(item, 0)).Sum();
        return new(similarity.ToString());
    }
}
