namespace AdventOfCode;

public class Day24 : BaseDay {
    private record Gate(string Input1, string Type, string Input2, string Output);

    private readonly Dictionary<string, bool> _wires;
    private readonly Dictionary<string, Gate> _gates;

    public Day24() : this("") { }

    public Day24(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        (_wires, _gates) = ParseInput(inputFile);
    }

    private static (Dictionary<string, bool>, Dictionary<string, Gate>) ParseInput(string file) {
        var sections = File.ReadAllText(file).ReplaceLineEndings("\n").Split("\n\n");

        var wires = sections[0]
            .Split("\n")
            .Select(line => line.Split(": "))
            .ToDictionary(parts => parts[0], parts => parts[1] == "1");

        var gates = sections[1]
            .Split("\n")
            .Select(line => line.Split(" "))
            .Select(parts => new Gate(parts[0], parts[1], parts[2], parts[4]))
            .ToDictionary(gate => gate.Output, gate => gate);

        return (wires, gates);
    }

    private bool ReadOutput(string label) {
        if (_wires.TryGetValue(label, out var value)) return value;

        var gate = _gates[label];
        var input1 = ReadOutput(gate.Input1);
        var input2 = ReadOutput(gate.Input2);

        return gate.Type switch {
            "AND" => input1 && input2,
            "OR" => input1 || input2,
            "XOR" => input1 ^ input2,
            _ => throw new ArgumentOutOfRangeException(nameof(gate.Type), gate.Type, null)
        };
    }

    private static List<Gate> GetFaultyGates(List<Gate> gates) {
        var faultyGates = new List<Gate>();

        foreach (var gate in gates) {
            if (gate.Output.StartsWith('z') && gate.Output != "z45" && gate.Type != "XOR") {
                faultyGates.Add(gate);
            }
            else if (!gate.Output.StartsWith('z')
                     && !(gate.Input1.StartsWith('x') || gate.Input1.StartsWith('y'))
                     && !(gate.Input2.StartsWith('x') || gate.Input2.StartsWith('y'))
                     && gate.Type == "XOR") {
                faultyGates.Add(gate);
            }
            else if (gate.Type == "XOR"
                     && (gate.Input1.StartsWith('x') || gate.Input1.StartsWith('y'))
                     && (gate.Input2.StartsWith('x') || gate.Input2.StartsWith('y'))
                     && !(gate.Input1.EndsWith("00") && gate.Input2.EndsWith("00"))) {
                var foundAnother = gates.Any(otherGate =>
                    !otherGate.Equals(gate) &&
                    (otherGate.Input1 == gate.Output || otherGate.Input2 == gate.Output) &&
                    otherGate.Type == "XOR");
                if (!foundAnother) faultyGates.Add(gate);
            }
            else if (gate.Type == "AND"
                     && (gate.Input1.StartsWith('x') || gate.Input1.StartsWith('y'))
                     && (gate.Input2.StartsWith('x') || gate.Input2.StartsWith('y'))
                     && !gate.Input1.EndsWith("00") && !gate.Input2.EndsWith("00")) {
                var foundAnother = gates.Any(otherGate =>
                    !otherGate.Equals(gate) &&
                    (otherGate.Input1 == gate.Output || otherGate.Input2 == gate.Output) &&
                    otherGate.Type == "OR");
                if (!foundAnother) faultyGates.Add(gate);
            }
        }

        return faultyGates;
    }

    public override ValueTask<string> Solve_1() => new(
        _gates.Keys
            .Where(key => key.StartsWith('z'))
            .OrderDescending()
            .Aggregate(0L, (acc, label) => (acc << 1) + (ReadOutput(label) ? 1 : 0))
            .ToString()
    );

    public override ValueTask<string> Solve_2() => new(
        string.Join(',', GetFaultyGates(_gates.Values.ToList()).Select(gate => gate.Output).Order())
    );
}