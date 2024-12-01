namespace AdventOfCode;

public class Day01 : BaseDay
{
    private readonly string _input;
    public override string InputFilePath { get; } = "Inputs/01-Example.txt";

    public Day01() : this(null) { }
    public Day01(string? filename)
    {
        _input = File.ReadAllText(filename ?? InputFilePath);
    }

    public override ValueTask<string> Solve_1()
    {
        var numbers = _input.Split(',').Select(int.Parse).ToList();
        var sum = numbers.Sum();
        return new($"{sum}");
    }

    public override ValueTask<string> Solve_2()
    {
        var numbers = _input.Split(',').Select(int.Parse).ToList();
        var sum = numbers.Sum() - 1;
        return new($"{sum}");
    }
}
