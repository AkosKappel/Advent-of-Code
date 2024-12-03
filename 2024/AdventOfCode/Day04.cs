namespace AdventOfCode;

public class Day04 : BaseDay
{
    private readonly string _input;
    public override string InputFilePath { get; } = "Inputs/04-Example.txt";

    public Day04() : this("")
    {
    }

    public Day04(string filename)
    {
        _input = File.ReadAllText(string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename);
    }

    private string[] ParseInput() => _input.Split("\n");

    public override ValueTask<string> Solve_1()
    {
        return new(0.ToString());
    }

    public override ValueTask<string> Solve_2()
    {
        return new(0.ToString());
    }
}