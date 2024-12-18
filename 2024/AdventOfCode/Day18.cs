using System.Numerics;

namespace AdventOfCode;

public class Day18 : BaseDay {
    private readonly List<Vector2> _bytes;
    private readonly int _gridSize;
    private readonly int _numBytesToUse;

    public Day18() : this("") { }

    public Day18(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        _bytes = ParseInput(inputFile);
        _gridSize = _bytes.Count > 30 ? 71 : 7;
        _numBytesToUse = _bytes.Count > 30 ? 1024 : 12;
    }

    private static List<Vector2> ParseInput(string file) => File
        .ReadAllText(file)
        .ReplaceLineEndings("\n")
        .Split("\n")
        .Select(line => {
            var parts = line.Split(',');
            return new Vector2(int.Parse(parts[0]), int.Parse(parts[1]));
        })
        .ToList();

    private static List<Vector2> Dijkstra(bool[,] grid) {
        var (width, height) = (grid.GetLength(0), grid.GetLength(1));

        var start = new Vector2(0, 0);
        var end = new Vector2(width - 1, height - 1);

        var prev = new Dictionary<Vector2, Vector2>();
        var dist = new Dictionary<Vector2, int> { [start] = 0 };
        var queue = new Queue<Vector2>();
        queue.Enqueue(start);

        while (queue.Count > 0) {
            var current = queue.Dequeue();
            if (current == end) return ReconstructPath(current);

            var neighbors = Directions.Cardinal
                .Select(dir => current + dir)
                .Where(IsWithinBounds)
                .Where(IsFree);

            foreach (var neighbor in neighbors) {
                var newDist = dist[current] + 1;
                if (dist.GetValueOrDefault(neighbor, int.MaxValue) > newDist) {
                    dist[neighbor] = newDist;
                    prev[neighbor] = current;
                    queue.Enqueue(neighbor);
                }
            }
        }

        return null;

        bool IsWithinBounds(Vector2 pos) => 0 <= pos.X && pos.X < width && 0 <= pos.Y && pos.Y < height;

        bool IsFree(Vector2 pos) => !grid[(int)pos.Y, (int)pos.X];

        List<Vector2> ReconstructPath(Vector2 current) {
            var path = new List<Vector2>();
            while (current != start) {
                path.Add(current);
                current = prev[current];
            }

            path.Reverse();
            return path;
        }
    }

    private static bool[,] CreateGrid(IEnumerable<Vector2> bytes, int size) {
        var grid = new bool[size, size];

        foreach (var pos in bytes) {
            grid[(int)pos.Y, (int)pos.X] = true;
        }

        return grid;
    }

    public override ValueTask<string> Solve_1() => new(
        Dijkstra(CreateGrid(_bytes.Take(_numBytesToUse), _gridSize)).Count.ToString()
    );

    public override ValueTask<string> Solve_2() {
        var grid = CreateGrid(_bytes.Take(_numBytesToUse), _gridSize);

        for (var i = _numBytesToUse; i < _bytes.Count; i++) {
            var nextByte = _bytes[i];
            grid[(int)nextByte.Y, (int)nextByte.X] = true;
            if (Dijkstra(grid) == null) return new($"{nextByte.X},{nextByte.Y}");
        }

        return new("-1,-1");
    }
}