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

    // initial grid should not have loops, so we skip loop detection in this function
    private List<(Vector2 pos, Vector2 dir)> GetPatrolPath(
        Vector2 currentPosition,
        Vector2 currentDirection,
        HashSet<Vector2> obstructions
    ) {
        var path = new List<(Vector2, Vector2)>();

        while (IsWithinBounds(currentPosition)) {
            var nextPosition = currentPosition + currentDirection;
            var isEmpty = !obstructions.Contains(nextPosition);

            if (isEmpty) {
                path.Add((currentPosition, currentDirection));
                currentPosition = nextPosition;
            }
            else {
                currentDirection = currentDirection.RotateRight();
            }
        }

        return path;
    }

    private bool IsGuardStuckInLoop(
        Vector2 currentPosition,
        Vector2 currentDirection,
        HashSet<Vector2> obstructions
    ) {
        var visited = new HashSet<(Vector2, Vector2)>();

        while (IsWithinBounds(currentPosition)) {
            // move in current direction as long as possible
            var nextPosition = currentPosition + currentDirection;
            while (IsWithinBounds(nextPosition) && !obstructions.Contains(nextPosition)) {
                nextPosition += currentDirection;
            }

            if (!IsWithinBounds(nextPosition)) return false;

            currentPosition = nextPosition - currentDirection; // step back to last valid position
            currentDirection = currentDirection.RotateRight();

            // store and check if we have been here before, to detect loops
            if (!visited.Add((currentPosition, currentDirection))) return true;
        }

        return false;
    }

    public override ValueTask<string> Solve_1() {
        var path = GetPatrolPath(_startingPosition, _startingDirection, _obstructions);
        var numVisitedTiles = path.Select(tile => tile.pos).Distinct().Count();
        return new(numVisitedTiles.ToString());
    }

    public override ValueTask<string> Solve_2() {
        var startingPoints = GetPatrolPath(_startingPosition, _startingDirection, _obstructions)
            .DistinctBy(tile => tile.pos + tile.dir); // discard duplicate positions where path crosses itself

        var numNewObstructions = startingPoints.Count(start => {
            var newObstruction = start.pos + start.dir; // add new obstruction right in front of guard
            _obstructions.Add(newObstruction);
            var isLooping = IsGuardStuckInLoop(start.pos, start.dir, _obstructions);
            _obstructions.Remove(newObstruction);
            return isLooping;
        });

        return new(numNewObstructions.ToString());
    }
}