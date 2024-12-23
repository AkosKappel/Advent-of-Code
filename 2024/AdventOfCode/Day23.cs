namespace AdventOfCode;

public class Day23 : BaseDay {
    private readonly Dictionary<string, HashSet<string>> _adjacencyList;

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

    private static void BronKerbosch(
        HashSet<string> R,
        HashSet<string> P,
        HashSet<string> X,
        Dictionary<string, HashSet<string>> graph,
        List<HashSet<string>> cliques
    ) {
        if (P.Count == 0 && X.Count == 0) {
            cliques.Add(new HashSet<string>(R));
            return;
        }

        var pivot = P.Concat(X).First();

        foreach (var v in P.Except(graph[pivot])) {
            var newR = new HashSet<string>(R) { v };
            var newP = new HashSet<string>(P.Intersect(graph[v]));
            var newX = new HashSet<string>(X.Intersect(graph[v]));

            BronKerbosch(newR, newP, newX, graph, cliques);
            P.Remove(v);
            X.Add(v);
        }
    }

    public override ValueTask<string> Solve_1() {
        const char firstLetter = 't';
        var triangles = new HashSet<string>();

        foreach (var (u, neighbors) in _adjacencyList) {
            foreach (var v in neighbors) {
                if (string.Compare(u, v, StringComparison.Ordinal) > 0) continue;
                var common = _adjacencyList[u].Intersect(_adjacencyList[v]);

                foreach (var w in common) {
                    if (string.Compare(u, w, StringComparison.Ordinal) > 0 ||
                        string.Compare(v, w, StringComparison.Ordinal) > 0) continue;

                    if (!u.StartsWith(firstLetter) && !v.StartsWith(firstLetter) && !w.StartsWith(firstLetter))
                        continue;

                    var key = string.Join(",", new[] { u, v, w }.OrderBy(x => x));
                    triangles.Add(key);
                }
            }
        }

        return new(triangles.Count.ToString());
    }

    public override ValueTask<string> Solve_2() {
        var cliques = new List<HashSet<string>>();

        BronKerbosch(
            R: new HashSet<string>(),
            P: new HashSet<string>(_adjacencyList.Keys),
            X: new HashSet<string>(),
            graph: _adjacencyList,
            cliques
        );

        var maximumClique = cliques.MaxBy(c => c.Count);
        var password = string.Join(",", maximumClique.OrderBy(x => x));

        return new(password);
    }
}