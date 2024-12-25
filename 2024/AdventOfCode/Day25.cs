namespace AdventOfCode;

public class Day25 : BaseDay {
    private readonly List<int[]> _locks;
    private readonly List<int[]> _keys;

    public Day25() : this("") { }

    public Day25(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        (_locks, _keys) = ParseInput(inputFile);
    }

    private static (List<int[]>, List<int[]>) ParseInput(string file) {
        var parts = File.ReadAllText(file).ReplaceLineEndings("\n").Split("\n\n");
        var (locks, keys) = (new List<int[]>(), new List<int[]>());

        foreach (var part in parts) {
            var rows = part.Split("\n");
            var targetList = rows.First().All(pin => pin == '#') ? locks : keys;
            var width = rows.Max(row => row.Length);
            var heights = Enumerable.Range(0, width)
                .Select(x => rows.Count(row => row[x] == '#') - 1)
                .ToArray();
            targetList.Add(heights);
        }

        return (locks, keys);
    }

    public override ValueTask<string> Solve_1() {
        const int maxHeight = 5;

        var numMatchedPairs = _locks
            .SelectMany(_ => _keys, (l, k) => (l, k))
            .Count(pair => pair.l.Zip(pair.k, (lockHeight, keyHeight) => lockHeight + keyHeight)
                .All(sum => sum <= maxHeight));

        return new(numMatchedPairs.ToString());
    }

    public override ValueTask<string> Solve_2() => new(String.Empty);
}