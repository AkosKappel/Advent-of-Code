using System.Text.RegularExpressions;

namespace AdventOfCode;

public class Day24 : BaseDay {
    private record Gate(string Input1, string Type, string Input2, string Output);

    private readonly Dictionary<string, bool> _wires;
    private readonly Gate[] _gates;
    // public override string InputFilePath { get; } = "Inputs/24-Example2.txt";

    public Day24() : this("") { }

    public Day24(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        (_wires, _gates) = ParseInput(inputFile);
    }

    private static (Dictionary<string, bool>, Gate[]) ParseInput(string file) {
        var sections = File.ReadAllText(file).ReplaceLineEndings("\n").Split("\n\n");
        var regex = new Regex(@"(?<in1>\w+) (?<op>AND|OR|XOR) (?<in2>\w+) -> (?<out>\w+)");

        var wires = sections[0]
            .Split("\n")
            .Select(line => line.Split(": "))
            .ToDictionary(parts => parts[0], parts => parts[1] == "1");

        var gates = sections[1]
            .Split("\n")
            .Select(line => {
                var groups = regex.Match(line).Groups;
                return new Gate(groups["in1"].Value, groups["op"].Value, groups["in2"].Value, groups["out"].Value);
            })
            .ToArray();

        return (wires, gates);
    }

    private static long DecodeOutput(Dictionary<string, bool> wires) => wires
        .Where(kvp => kvp.Key.StartsWith('z'))
        .OrderBy(kvp => kvp.Key)
        .Reverse()
        .Aggregate(0L, (acc, kvp) => acc * 2 + (kvp.Value ? 1 : 0));

    private static bool EvaluateGate(Gate gate, Dictionary<string, bool> wires) {
        if (wires.ContainsKey(gate.Output)) return true;
        if (!wires.TryGetValue(gate.Input1, out var input1)) return false;
        if (!wires.TryGetValue(gate.Input2, out var input2)) return false;

        wires[gate.Output] =
            gate.Type switch {
                "AND" => input1 && input2,
                "OR" => input1 || input2,
                "XOR" => input1 ^ input2,
                _ => throw new ArgumentOutOfRangeException(nameof(gate.Type), gate.Type, null)
            };

        return true;
    }

    public override ValueTask<string> Solve_1() {
        var queue = new Queue<Gate>(_gates);

        while (queue.TryDequeue(out var gate)) {
            if (EvaluateGate(gate, _wires)) continue;
            queue.Enqueue(gate);
        }

        return new(DecodeOutput(_wires).ToString());
    }

    public override ValueTask<string> Solve_2() {
        return new(0.ToString());
    }
}