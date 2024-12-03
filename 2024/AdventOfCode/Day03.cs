using System.Text.RegularExpressions;

namespace AdventOfCode;

public class Day03 : BaseDay
{
    private readonly string _input;

    public Day03() : this("")
    {
    }

    public Day03(string filename)
    {
        _input = File.ReadAllText(string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename);
    }

    private string ParseInput() => string.Join("", _input.Split("\n"));

    public override ValueTask<string> Solve_1()
    {
        var regex = new Regex(@"mul\((\d{1,3}),(\d{1,3})\)");
        var program = ParseInput();
        var total = regex.Matches(program)
            .Aggregate(0, (counter, match) =>
            {
                var x = int.Parse(match.Groups[1].Value);
                var y = int.Parse(match.Groups[2].Value);
                return counter + x * y;
            });
        return new(total.ToString());
    }

    public override ValueTask<string> Solve_2()
    {
        var regex = new Regex(@"mul\((\d{1,3}),(\d{1,3})\)|don't\(\)|do\(\)");
        var program = ParseInput();

        var enabled = true;
        var total = regex.Matches(program)
            .Aggregate(0, (counter, match) =>
            {
                if (match.Value == "don't()") enabled = false;
                else if (match.Value == "do()") enabled = true;
                else if (enabled)
                {
                    var x = int.Parse(match.Groups[1].Value);
                    var y = int.Parse(match.Groups[2].Value);
                    return counter + x * y;
                }

                return counter;
            });
        return new(total.ToString());
    }
}