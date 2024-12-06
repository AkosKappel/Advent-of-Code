using System.Numerics;

namespace AdventOfCode;

public class Day06 : BaseDay {
    private readonly Vector2 _position;
    private readonly Vector2 _direction;
    private readonly HashSet<Vector2> _obstructions;
    private readonly int _width;
    private readonly int _height;
    public override string InputFilePath { get; } = "Inputs/06-Example.txt";

    public Day06() : this("") { }

    public Day06(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        (_obstructions, _position, _width, _height) = ParseInput(inputFile);
        _direction = Directions.Up;
    }

    private static (HashSet<Vector2>, Vector2, int, int) ParseInput(string file) {
        var raw = File.ReadAllText(file).ReplaceLineEndings("\n");
        var rows = raw.Split("\n");
        var width = rows.Max(row => row.Length);
        var height = rows.Length;
        var cells = rows.SelectMany((row, y) => row.Select((c, x) => new { c, x, y })).ToList();
        var obstructions = cells
            .Where(x => x.c == '#')
            .Select(cell => new Vector2(cell.x, cell.y))
            .ToHashSet();
        var startingPosition = cells.First(cell => cell.c == '^');
        return (obstructions, new Vector2(startingPosition.x, startingPosition.y), width, height);
    }

    private bool IsWithinBounds(Vector2 coord) => 0 <= coord.X && coord.X < _width &&
                                                  0 <= coord.Y && coord.Y < _height;

    private bool IsEmpty(Vector2 coord) => !_obstructions.Contains(coord);

    public override ValueTask<string> Solve_1() {
        var currentPosition = _position;
        var currentDirection = _direction;

        var visited = new HashSet<Vector2> { currentPosition };
        var nextPosition = currentPosition + currentDirection;

        while (IsWithinBounds(nextPosition)) {
            if (IsEmpty(nextPosition)) {
                currentPosition = nextPosition;
                visited.Add(currentPosition);
            }
            else {
                currentDirection = currentDirection.RotateRight();
            }

            nextPosition = currentPosition + currentDirection;
        }

        return new(visited.Count.ToString());
    }

    public override ValueTask<string> Solve_2() {
        return new(0.ToString());
    }
}