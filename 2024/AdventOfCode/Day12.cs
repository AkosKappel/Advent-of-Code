using System.Numerics;

namespace AdventOfCode;

public class Day12 : BaseDay {
    private readonly Dictionary<int, HashSet<Vector2>> _gardenPlots;
    public override string InputFilePath { get; } = "Inputs/12-Example.txt";

    public Day12() : this("") { }

    public Day12(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        _gardenPlots = ParseInput(inputFile);
    }

    private static Dictionary<int, HashSet<Vector2>> ParseInput(string file) {
        var grid = File.ReadAllText(file).Split("\n").Select(row => row.Trim()).ToList();
        var width = grid.Max(row => row.Length);
        var height = grid.Count;

        var garden = new Dictionary<int, HashSet<Vector2>>();
        var visited = new HashSet<Vector2>();

        var id = 0;
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                var current = new Vector2(x, y);
                if (!visited.Add(current)) {
                    continue;
                }

                var region = ExploreRegion(current, grid, width, height, visited);
                garden.Add(id++, region);
            }
        }

        return garden;
    }

    private static HashSet<Vector2> ExploreRegion(
        Vector2 start, List<string> grid, int width, int height, HashSet<Vector2> visited
    ) {
        var region = new HashSet<Vector2>();
        var queue = new Queue<Vector2>();
        queue.Enqueue(start);

        while (queue.Count > 0) {
            var current = queue.Dequeue();
            region.Add(current);

            foreach (var dir in Directions.Cardinal) {
                var neighbor = current + dir;
                if (0 > neighbor.X || neighbor.X >= width || 0 > neighbor.Y || neighbor.Y >= height) continue;
                if (visited.Contains(neighbor)) continue;
                if (grid[(int)current.Y][(int)current.X] != grid[(int)neighbor.Y][(int)neighbor.X]) continue;

                queue.Enqueue(neighbor);
                visited.Add(neighbor);
            }
        }

        return region;
    }

    private static int GetArea(HashSet<Vector2> region) => region.Count;

    private static int GetPerimeter(HashSet<Vector2> region) =>
        region.Sum(p => Directions.Cardinal.Count(dir => !region.Contains(p + dir)));

    private static int GetNumberOfSides(HashSet<Vector2> region) {
        return 0;
    }

    public override ValueTask<string> Solve_1() => new(_gardenPlots
        .Select(entry => {
            var region = entry.Value;
            return GetArea(region) * GetPerimeter(region);
        })
        .Sum()
        .ToString()
    );

    public override ValueTask<string> Solve_2() => new(_gardenPlots
        .Select(entry => {
            var region = entry.Value;
            return GetArea(region) * GetNumberOfSides(region);
        })
        .Sum()
        .ToString()
    );
}