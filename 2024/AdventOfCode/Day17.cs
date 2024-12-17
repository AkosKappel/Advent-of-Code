using System.Text;
using System.Text.RegularExpressions;

namespace AdventOfCode;

public class Day17 : BaseDay {
    private readonly (int A, int B, int C) _register;
    private readonly List<int> _program;
    // public override string InputFilePath { get; } = "Inputs/17-Example.txt";

    public Day17() : this("") { }

    public Day17(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        (_register, _program) = ParseInput(inputFile);
    }

    private static ((int A, int B, int C), List<int>) ParseInput(string file) {
        var parts = File.ReadAllText(file).ReplaceLineEndings("\n").Split("\n\n");
        var regex = new Regex(@"Register A: (?<a>-?\d+)\nRegister B: (?<b>-?\d+)\nRegister C: (?<c>-?\d+)",
            RegexOptions.Compiled);
        var program = parts[1].Replace("Program: ", "").Split(",").Select(int.Parse).ToList();
        var match = regex.Match(parts[0]);
        var register = (
            int.Parse(match.Groups["a"].Value),
            int.Parse(match.Groups["b"].Value),
            int.Parse(match.Groups["c"].Value)
        );
        return (register, program);
    }

    private static List<int> Run((int A, int B, int C) register, List<int> program) {
        var output = new List<int>();

        for (var pointer = 0; pointer < program.Count; pointer += 2) {
            var opcode = program[pointer];
            var operand = program[pointer + 1];

            switch (opcode) {
                case 0:
                    register.A /= (int)Math.Pow(2, Combo(operand));
                    break;
                case 1:
                    register.B ^= operand;
                    break;
                case 2:
                    register.B = Combo(operand) % 8;
                    break;
                case 3:
                    if (register.A != 0) pointer = operand - 2;
                    break;
                case 4:
                    register.B ^= register.C;
                    break;
                case 5:
                    output.Add(Combo(operand) % 8);
                    break;
                case 6:
                    register.B = register.A / (int)Math.Pow(2, Combo(operand));
                    break;
                case 7:
                    register.C = register.A / (int)Math.Pow(2, Combo(operand));
                    break;
                default:
                    throw new ArgumentOutOfRangeException($"Unknown opcode: {opcode}");
            }
        }

        return output;

        int Combo(int x) => x switch {
            >= 0 and <= 3 => x,
            4 => register.A,
            5 => register.B,
            6 => register.C,
            _ => throw new ArgumentOutOfRangeException(nameof(x), x, null)
        };
    }

    public override ValueTask<string> Solve_1() => new(string.Join(",", Run(_register, _program)));

    public override ValueTask<string> Solve_2() {
        return new(0.ToString());
    }
}