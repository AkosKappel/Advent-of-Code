namespace AdventOfCode;

public class Day10 : BaseDay {
    private readonly List<int> _firstColumn;
    public override string InputFilePath { get; } = "Inputs/10-Example.txt";

    public Day10() : this("") { }

    public Day10(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        // (_firstColumn, _secondColumn) = ParseInput(inputFile);
    }

    private static (List<int>, List<int>) ParseInput(string file) {
        var raw = File.ReadAllText(file).ReplaceLineEndings("\n");
        return (null, null);
    }

    public override ValueTask<string> Solve_1() {
        return new(0.ToString());
    }

    public override ValueTask<string> Solve_2() {
        return new(0.ToString());
    }
}