namespace AdventOfCode;

public class Day23 : BaseDay {
    private readonly Dictionary<string, HashSet<string>> _adjacencyList;
    // public override string InputFilePath { get; } = "Inputs/23-Example.txt";

    public Day23() : this("") { }

    public Day23(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        (_adjacencyList) = ParseInput(inputFile);
    }

    private static Dictionary<string, HashSet<string>> ParseInput(string file) {
        var lines = File.ReadAllText(file).ReplaceLineEndings("\n").Split("\n");
        var adjacencyList = new Dictionary<string, HashSet<string>>();

        foreach (var line in lines) {
            var edge = line.Split("-");
            var (u, v) = (edge[0], edge[1]);

            if (!adjacencyList.ContainsKey(u)) adjacencyList[u] = new HashSet<string>();
            if (!adjacencyList.ContainsKey(v)) adjacencyList[v] = new HashSet<string>();

            adjacencyList[u].Add(v);
            adjacencyList[v].Add(u);
        }

        return adjacencyList;
    }

    public override ValueTask<string> Solve_1() {
        var triangles = new HashSet<string>();

        foreach (var u in _adjacencyList.Keys) {
            foreach (var v in _adjacencyList[u]) {
                if (string.Compare(u, v, StringComparison.Ordinal) > 0) continue;
                var common = _adjacencyList[u].Intersect(_adjacencyList[v]);

                foreach (var w in common) {
                    if (string.Compare(u, w, StringComparison.Ordinal) > 0 ||
                        string.Compare(v, w, StringComparison.Ordinal) > 0) continue;

                    var key = string.Join(",", new[] { u, v, w }.OrderBy(x => x));
                    triangles.Add(key);
                }
            }
        }

        var targets = triangles.Where(x => x.Split(",").Any(x => x.StartsWith("t")));
        return new(targets.Count().ToString());
    }

    public override ValueTask<string> Solve_2() {
        return new(0.ToString());
    }
}