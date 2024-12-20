using System.Numerics;

namespace AdventOfCode;

public class Day16 : BaseDay {
    private const char Wall = '#';
    private const char Empty = '.';

    private readonly List<string> _maze;
    private readonly Vector2 _start;
    private readonly Vector2 _end;

    public Day16() : this("") { }

    public Day16(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        _maze = ParseInput(inputFile);
        _start = FindPosition(_maze, 'S');
        _end = FindPosition(_maze, 'E');
    }

    private static List<string> ParseInput(string file) => File
        .ReadAllText(file)
        .ReplaceLineEndings("\n")
        .Split("\n")
        .ToList();

    private static Vector2 FindPosition(List<string> maze, char c) {
        var y = maze.FindIndex(row => row.Contains(c));
        var x = maze[y].IndexOf(c);
        return new Vector2(x, y);
    }

    private static Dictionary<Vector2, List<Vector2>> BuildGraph(List<string> maze) => maze
        .SelectMany((row, y) => row.Select((c, x) => new { c, x, y }))
        .Where(node => node.c != Wall)
        .GroupBy(node => new Vector2(node.x, node.y))
        .ToDictionary(
            group => group.Key,
            group => Directions.Cardinal
                .Select(dir => group.Key + dir)
                .Where(neighbor => maze[(int)neighbor.Y][(int)neighbor.X] != Wall)
                .ToList()
        );

    private static (long lowestScore, long numBestSpots) Dijkstra(
        Dictionary<Vector2, List<Vector2>> maze,
        Vector2 start,
        Vector2 end
    ) {
        var distances = new Dictionary<(Vector2, Vector2), long>();
        var queue = new PriorityQueue<(Vector2 pos, Vector2 dir, HashSet<Vector2> path), long>();
        queue.Enqueue((start, Directions.East, new() { start }), 0);

        var bestScore = long.MaxValue;
        var bestSpots = new HashSet<Vector2>();

        while (queue.TryDequeue(out var current, out var score)) {
            if (current.pos == end) {
                if (score < bestScore) { // new best path
                    bestScore = score;
                    bestSpots = current.path;
                }
                else if (score == bestScore) { // alternative best path
                    bestSpots.UnionWith(current.path);
                }

                continue;
            }

            var key = (current.pos, current.dir);
            if (distances.TryGetValue(key, out var existingScore) && existingScore < score) {
                continue;
            }

            distances[key] = score;

            foreach (var neighbor in maze[current.pos]) {
                if (current.path.Contains(neighbor)) continue;

                var newDir = neighbor - current.pos;
                var newScore = score + 1 + (newDir != current.dir ? 1000 : 0);
                var newPath = new HashSet<Vector2>(current.path) { neighbor };

                queue.Enqueue((neighbor, newDir, newPath), newScore);
            }
        }

        return (bestScore, bestSpots.Count);
    }

    public override ValueTask<string> Solve_1() => new(
        Dijkstra(BuildGraph(_maze), _start, _end).lowestScore.ToString()
    );

    public override ValueTask<string> Solve_2() => new(
        Dijkstra(BuildGraph(_maze), _start, _end).numBestSpots.ToString()
    );

    [Obsolete("For debugging only")]
    private static void ShowGrid(
        Dictionary<Vector2, List<Vector2>> maze,
        Vector2 start,
        Vector2 end,
        HashSet<Vector2> path
    ) {
        var width = maze.Keys.Max(pos => pos.X) + 1;
        var height = maze.Keys.Max(pos => pos.Y) + 1;

        for (var y = 0; y <= height; y++) {
            for (var x = 0; x <= width; x++) {
                var pos = new Vector2(x, y);

                switch (pos) {
                    case var p when path.Contains(p):
                        Console.Write('O');
                        break;
                    case var p when p == start:
                        Console.Write('S');
                        break;
                    case var p when p == end:
                        Console.Write('E');
                        break;
                    case var p when maze.ContainsKey(p):
                        Console.Write('.');
                        break;
                    default:
                        Console.Write('#');
                        break;
                }
            }

            Console.WriteLine();
        }

        Console.WriteLine();
    }
}