using System.Text.RegularExpressions;

namespace AdventOfCode;

public class Day03 : BaseDay {
    private readonly string _program;

    public Day03() : this("") { }

    public Day03(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        _program = ParseInput(inputFile);
    }

    private static string ParseInput(string file) => string.Join("", File.ReadAllText(file).Split("\n"));

    public override ValueTask<string> Solve_1() {
        var regex = new Regex(@"mul\((\d{1,3}),(\d{1,3})\)");
        var total = regex.Matches(_program)
            .Aggregate(0, (counter, match) => {
                var x = int.Parse(match.Groups[1].Value);
                var y = int.Parse(match.Groups[2].Value);
                return counter + x * y;
            });
        return new(total.ToString());
    }

    public override ValueTask<string> Solve_2() {
        var regex = new Regex(@"mul\((\d{1,3}),(\d{1,3})\)|don't\(\)|do\(\)");

        var enabled = true;
        var total = regex.Matches(_program)
            .Aggregate(0, (counter, match) => {
                if (match.Value == "don't()") enabled = false;
                else if (match.Value == "do()") enabled = true;
                else if (enabled) {
                    var x = int.Parse(match.Groups[1].Value);
                    var y = int.Parse(match.Groups[2].Value);
                    return counter + x * y;
                }

                return counter;
            });
        return new(total.ToString());
    }
}