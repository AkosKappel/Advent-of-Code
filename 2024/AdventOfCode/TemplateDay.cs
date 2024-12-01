namespace AdventOfCode;

public class Day00 : BaseDay
{
    private readonly string _input;
    public override string InputFilePath { get; } = "Inputs/00-Example.txt";

    public Day00() : this(null) { }
    public Day00(string? filename)
    {
        _input = File.ReadAllText(filename ?? InputFilePath);
    }

    private string[] ParseInput() => _input.Split("\n");
    
    public override ValueTask<string> Solve_1()
    {
        var value = 0;
        return new($"{value}");
    }

    public override ValueTask<string> Solve_2()
    {
        var value = 0;
        return new($"{value}");
    }
}