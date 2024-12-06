using System.Numerics;

namespace AdventOfCode;

public class Day06 : BaseDay {
    private readonly Vector2 _startingPosition;
    private readonly Vector2 _startingDirection;
    private readonly HashSet<Vector2> _obstructions;
    private readonly int _width;
    private readonly int _height;

    public Day06() : this("") { }

    public Day06(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        (_obstructions, _startingPosition, _width, _height) = ParseInput(inputFile);
        _startingDirection = Directions.Up;
    }

    private static (HashSet<Vector2>, Vector2, int, int) ParseInput(string file) {
        var raw = File.ReadAllText(file).ReplaceLineEndings("\n");
        var rows = raw.Split("\n");
        var width = rows.Max(row => row.Length);
        var height = rows.Length;
        var tiles = rows.SelectMany((row, y) => row.Select((c, x) => new { c, x, y })).ToList();
        var obstructions = tiles
            .Where(tile => tile.c == '#')
            .Select(tile => new Vector2(tile.x, tile.y))
            .ToHashSet();
        var startingPosition = tiles.First(tile => tile.c == '^');
        return (obstructions, new Vector2(startingPosition.x, startingPosition.y), width, height);
    }

    private bool IsWithinBounds(Vector2 coord) => 0 <= coord.X && coord.X < _width &&
                                                  0 <= coord.Y && coord.Y < _height;

    private List<Vector2>? WalkPatrol(Vector2 currentPosition, Vector2 currentDirection,
        HashSet<Vector2> obstructions) {
        var path = new List<Vector2>();
        var visited = new HashSet<(Vector2, Vector2)>();

        while (IsWithinBounds(currentPosition)) {
            path.Add(currentPosition);

            var current = (currentPosition, currentDirection);
            if (visited.Contains(current)) return null; // loop detected
            visited.Add(current);

            var nextPosition = currentPosition + currentDirection;
            var isEmpty = !obstructions.Contains(nextPosition);

            if (isEmpty) {
                currentPosition = nextPosition;
            }
            else {
                currentDirection = currentDirection.RotateRight();
            }
        }

        return path;
    }

    public override ValueTask<string> Solve_1() {
        var path = WalkPatrol(_startingPosition, _startingDirection, _obstructions)!;
        var visited = path.Distinct();
        return new(visited.Count().ToString());
    }

    public override ValueTask<string> Solve_2() {
        var path = WalkPatrol(_startingPosition, _startingDirection, _obstructions)!;
        var visited = path.Distinct();

        var numNewObstructions = visited
            .Count(tile => {
                _obstructions.Add(tile);
                var newPath = WalkPatrol(_startingPosition, _startingDirection, _obstructions);
                _obstructions.Remove(tile);
                var hasLoop = newPath is null;
                return hasLoop;
            });

        return new(numNewObstructions.ToString());
    }

    [Obsolete("This function was used in a previous incorrect attempt.")]
    private static Vector2? CalculateFourthPoint(Vector2 p1, Vector2 p2, Vector2 p3) {
        var vec12 = p1 - p2;
        var vec23 = p2 - p3;
        var vec13 = p1 - p3;

        var mag12 = Math.Abs(vec12.X) + Math.Abs(vec12.Y);
        var mag23 = Math.Abs(vec23.X) + Math.Abs(vec23.Y);
        var mag13 = Math.Abs(vec13.X) + Math.Abs(vec13.Y);

        var magnitudes = new[] { mag12, mag23, mag13 };
        var longestIndex = Array.IndexOf(magnitudes, magnitudes.Max());

        return longestIndex switch {
            0 => p1 - p3 + p2,
            1 => p2 - p1 + p3,
            2 => p1 - p2 + p3,
            _ => null
        };
    }
}