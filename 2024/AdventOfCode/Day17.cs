using System.Text;
using System.Text.RegularExpressions;

namespace AdventOfCode;

public class Day17 : BaseDay {
    private readonly (long A, long B, long C) _register;
    private readonly List<long> _program;

    public Day17() : this("") { }

    public Day17(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        (_register, _program) = ParseInput(inputFile);
    }

    private static ((long A, long B, long C), List<long>) ParseInput(string file) {
        var parts = File.ReadAllText(file).ReplaceLineEndings("\n").Split("\n\n");
        var regex = new Regex(@"Register A: (?<a>-?\d+)\nRegister B: (?<b>-?\d+)\nRegister C: (?<c>-?\d+)",
            RegexOptions.Compiled);
        var program = parts[1].Replace("Program: ", "").Split(",").Select(long.Parse).ToList();
        var match = regex.Match(parts[0]);
        var register = (
            long.Parse(match.Groups["a"].Value),
            long.Parse(match.Groups["b"].Value),
            long.Parse(match.Groups["c"].Value)
        );
        return (register, program);
    }

    private static List<long> Run((long A, long B, long C) register, List<long> program) {
        var output = new List<long>();

        for (var pointer = 0; pointer < program.Count; pointer += 2) {
            var opcode = program[pointer];
            var operand = program[pointer + 1];

            switch (opcode) {
                case 0: // adv
                    register.A /= (long)Math.Pow(2, Combo(operand));
                    break;
                case 1: // bxl
                    register.B ^= operand;
                    break;
                case 2: // bst
                    register.B = Combo(operand) % 8;
                    break;
                case 3: // jnz
                    if (register.A != 0) pointer = (int)operand - 2;
                    break;
                case 4: // bxc
                    register.B ^= register.C;
                    break;
                case 5: // out
                    output.Add(Combo(operand) % 8);
                    break;
                case 6: // bdv
                    register.B = register.A / (long)Math.Pow(2, Combo(operand));
                    break;
                case 7: // cdv
                    register.C = register.A / (long)Math.Pow(2, Combo(operand));
                    break;
                default:
                    throw new ArgumentOutOfRangeException($"Unknown opcode: {opcode}");
            }
        }

        return output;

        long Combo(long x) => x switch {
            >= 0 and <= 3 => x,
            4 => register.A,
            5 => register.B,
            6 => register.C,
            _ => throw new ArgumentOutOfRangeException(nameof(x), x, null)
        };
    }

    public override ValueTask<string> Solve_1() => new(string.Join(",", Run(_register, _program)));

    private List<long> DFS(long val, int depth) {
        List<long> result = new();
        if (depth > _program.Count) return result;
        var nweVal = val << 3;

        for (var i = 0; i < 8; i++) {
            var partialResult = Run((nweVal + i, _register.B, _register.C), _program);
            if (!partialResult.SequenceEqual(_program.TakeLast(depth + 1))) continue;
            if (depth + 1 == _program.Count) result.Add(nweVal + i);
            result.AddRange(DFS(nweVal + i, depth + 1));
        }

        return result;
    }

    public override ValueTask<string> Solve_2() => new(DFS(0, 0).Min().ToString());
}