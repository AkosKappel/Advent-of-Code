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

            foreach (var dir in Directions.Orthogonal) {
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
        region.Sum(p => Directions.Orthogonal.Count(dir => !region.Contains(p + dir)));

    private static int GetNumberOfSides(HashSet<Vector2> region) {
        var squares = new HashSet<(Vector2 topLeft, Vector2 topRight, Vector2 bottomRight, Vector2 bottomLeft)>();
        foreach (var pos in region) {
            // generate all neighboring points
            var right = pos + Directions.Right;
            var downRight = pos + Directions.DownRight;
            var down = pos + Directions.Down;
            var downLeft = pos + Directions.DownLeft;
            var left = pos + Directions.Left;
            var upLeft = pos + Directions.UpLeft;
            var up = pos + Directions.Up;
            var upRight = pos + Directions.UpRight;

            // create all possible 2x2 squares that cover at least one point in the region
            if (!(region.Contains(pos) && region.Contains(right) &&
                  region.Contains(downRight) && region.Contains(down))) {
                squares.Add((pos, right, downRight, down));
            }

            if (!region.Contains(left) && !(region.Contains(left) && region.Contains(pos) &&
                                            region.Contains(down) && region.Contains(downLeft))) {
                squares.Add((left, pos, down, downLeft));
            }

            if (!region.Contains(upLeft) && !(region.Contains(upLeft) && region.Contains(up) &&
                                              region.Contains(pos) && region.Contains(left))) {
                squares.Add((upLeft, up, pos, left));
            }

            if (!region.Contains(up) && !(region.Contains(up) && region.Contains(upRight) &&
                                          region.Contains(right) && region.Contains(pos))) {
                squares.Add((up, upRight, right, pos));
            }
        }

        var sides = 0; // number of sides is the same as number of corners

        foreach (var square in squares) {
            var points = new[] { square.topLeft, square.topRight, square.bottomRight, square.bottomLeft }
                .Where(region.Contains)
                .ToArray();

            // inner or outer corner
            if (points.Length == 1 || points.Length == 3) sides++;
            // 2 corners that meet diagonally
            else if (points.Length == 2 && (points.First() - points.Last()).IsDiagonal()) sides += 2;
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