using System.Numerics;

namespace AdventOfCode;

public class Day10 : BaseDay {
    private readonly List<List<int>> _map;
    private readonly int _width;
    private readonly int _height;

    private const int LowestPoint = 0;
    private const int HighestPoint = 9;
    private const int Unreachable = -1;

    public Day10() : this("") { }

    public Day10(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        (_map, _width, _height) = ParseInput(inputFile);
    }

    private static (List<List<int>>, int, int) ParseInput(string file) {
        var raw = File.ReadAllText(file).ReplaceLineEndings("\n");
        var rows = raw.Split("\n");
        var width = rows.Max(row => row.Length);
        var height = rows.Length;
        var grid = rows
            .Select(row => row.Select(c => int.TryParse(c.ToString(), out var i) ? i : Unreachable).ToList())
            .ToList();
        return (grid, width, height);
    }

    private List<Vector2> GetTrailheads() => _map
        .SelectMany((row, y) => row.Select((c, x) => new { c, x, y }))
        .Where(node => node.c == LowestPoint)
        .Select(node => new Vector2(node.x, node.y))
        .ToList();

    private bool IsWithinBounds(Vector2 pos) => 0 <= pos.X && pos.X < _width && 0 <= pos.Y && pos.Y < _height;

    private List<Vector2> GetNeighbors(Vector2 pos) => Directions.Orthogonal
        .Select(dir => pos + dir)
        .Where(newPos =>
            IsWithinBounds(newPos) && MapAt(newPos) == MapAt(pos) + 1)
        .ToList();

    private int MapAt(Vector2 pos) => _map[(int)pos.Y][(int)pos.X];

    private (int score, int rating) SolveHikeTrail(Vector2 trailhead) {
        var visited = new Dictionary<Vector2, int> { { trailhead, 1 } };
        var queue = new Queue<Vector2>();
        queue.Enqueue(trailhead);

        var score = 0;
        var rating = 0;

        while (queue.Count > 0) {
            var current = queue.Dequeue();
            var currentWays = visited[current];

            if (MapAt(current) == HighestPoint) {
                score++;
                rating += currentWays;
                continue;
            }

            foreach (var neighbor in GetNeighbors(current)) {
                if (visited.TryAdd(neighbor, currentWays)) {
                    queue.Enqueue(neighbor);
                }
                else {
                    visited[neighbor] += currentWays;
                }
            }
        }

        return (score, rating);
    }

    public override ValueTask<string> Solve_1() => new(
        GetTrailheads()
            .Select(start => SolveHikeTrail(start).score)
            .Sum()
            .ToString()
    );

    public override ValueTask<string> Solve_2() => new(
        GetTrailheads()
            .Select(start => SolveHikeTrail(start).rating)
            .Sum()
            .ToString()
    );
}