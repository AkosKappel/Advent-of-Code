using System.Numerics;

namespace AdventOfCode;

public class Day06 : BaseDay {
    private readonly Vector2 _startingPosition;
    private readonly Vector2 _startingDirection;
    private readonly HashSet<Vector2> _obstructions;
    private readonly int _width;
    private readonly int _height;
    // public override string InputFilePath { get; } = "Inputs/06-Example.txt";

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

    private HashSet<(Vector2, Vector2)> WalkPatrol(
        Vector2 currentPosition,
        Vector2 currentDirection,
        HashSet<Vector2> obstructions
    ) {
        var visited = new HashSet<(Vector2, Vector2)>();

        while (IsWithinBounds(currentPosition)) {
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

        return visited;
    }

    public override ValueTask<string> Solve_1() {
        var visitedTiles = WalkPatrol(_startingPosition, _startingDirection, _obstructions)!;
        var numTiles = visitedTiles.Select(tile => tile.Item1).Distinct().Count();
        return new(numTiles.ToString());
    }

    public override ValueTask<string> Solve_2() {
        var visitedTiles = WalkPatrol(_startingPosition, _startingDirection, _obstructions)!;
        var possibleObstructions = visitedTiles.Select(tile => tile.Item1).Distinct();

        var numNewObstructions = possibleObstructions.Count(newObstruction => {
            _obstructions.Add(newObstruction);
            var newPath = WalkPatrol(_startingPosition, _startingDirection, _obstructions);
            _obstructions.Remove(newObstruction);

            var hasLoop = newPath is null;
            return hasLoop;
        });

        return new(numNewObstructions.ToString());
    }
}