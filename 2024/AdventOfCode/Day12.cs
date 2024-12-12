using System.Numerics;

namespace AdventOfCode;

public class Day12 : BaseDay {
    private readonly Dictionary<int, HashSet<Vector2>> _gardenPlots;

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
        // create four 2x2 squares around each point
        var squares = new HashSet<(Vector2 topLeft, Vector2 topRight, Vector2 bottomRight, Vector2 bottomLeft)>();
        foreach (var pos in region) {
            squares.Add((pos, pos + Directions.Right, pos + Directions.DownRight, pos + Directions.Down));
            squares.Add((pos + Directions.Left, pos, pos + Directions.Down, pos + Directions.DownLeft));
            squares.Add((pos + Directions.UpLeft, pos + Directions.Up, pos, pos + Directions.Left));
            squares.Add((pos + Directions.Up, pos + Directions.UpRight, pos + Directions.Right, pos));
        }

        var sides = 0;

        foreach (var square in squares) {
            var common = new HashSet<Vector2>
                    { square.topLeft, square.topRight, square.bottomRight, square.bottomLeft }
                .Intersect(region)
                .ToHashSet();

            // inner or outer corner
            if (common.Count == 1 || common.Count == 3) sides++;
            // 2 corners that meet diagonally
            else if (common.Count == 2 && (common.First() - common.Last()).IsDiagonal()) sides += 2;
        }

        return sides;
    }

    public override ValueTask<string> Solve_1() => new(_gardenPlots
        .Select(entry => {
            var region = entry.Value;
            var area = GetArea(region);
            var perimeter = GetPerimeter(region);
            return area * perimeter;
        })
        .Sum()
        .ToString()
    );

    public override ValueTask<string> Solve_2() => new(_gardenPlots
        .Select(entry => {
            var region = entry.Value;
            var area = GetArea(region);
            var numSides = GetNumberOfSides(region);
            return area * numSides;
        })
        .Sum()
        .ToString()
    );
}