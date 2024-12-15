using System.Numerics;

namespace AdventOfCode;

public class Day15 : BaseDay {
    private const char Robot = '@';
    private const char Box = 'O';
    private const char Wall = '#';
    private const char Empty = '.';

    private static readonly Dictionary<char, Vector2> _movementDirection = new() {
        { '^', Directions.Up },
        { '>', Directions.Right },
        { 'v', Directions.Down },
        { '<', Directions.Left },
    };

    private readonly char[][] _grid;
    private readonly string _moves;
    private readonly Vector2 _pos;
    public override string InputFilePath { get; } = "Inputs/15-Example.txt";

    public Day15() : this("") { }

    public Day15(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        (_grid, _moves) = ParseInput(inputFile);

        var rowIndex = Array.FindIndex(_grid, row => row.Contains(Robot));
        var colIndex = Array.IndexOf(_grid[rowIndex], Robot);
        _pos = new Vector2(colIndex, rowIndex);
        SetGridAt(_pos, Empty);
    }

    private static (char[][], string) ParseInput(string file) {
        var parts = File.ReadAllText(file).ReplaceLineEndings("\n").Split("\n\n");
        var grid = parts[0].Split("\n").Select(row => row.ToCharArray()).ToArray();
        var moves = parts[1].Trim().Replace("\n", "");
        return (grid, moves);
    }

    private char GridAt(Vector2 position) => _grid[(int)position.Y][(int)position.X];
    private void SetGridAt(Vector2 position, char value) => _grid[(int)position.Y][(int)position.X] = value;

    private static void ShowGrid(char[][] grid, Vector2 robot) {
        Console.WriteLine(string.Join("\n", grid.Select((row, y) => string.Concat(
            row.Select((c, x) => x == (int)robot.X && y == (int)robot.Y ? Robot : c)
        ).ToString())) + "\n");
    }

    private static long GpsCoordinate(Vector2 pos) => 100 * (int)pos.Y + (int)pos.X;

    public override ValueTask<string> Solve_1() {
        var pos = _pos;

        foreach (var move in _moves) {
            var dir = _movementDirection[move];
            var newPos = pos + dir;

            switch (GridAt(newPos)) {
                case Wall:
                    continue;
                case Empty:
                    pos = newPos;
                    continue;
                case Box:
                    var availablePos = newPos;
                    while (GridAt(availablePos) == Box) availablePos += dir;
                    if (GridAt(availablePos) == Wall) continue;

                    SetGridAt(availablePos, Box);
                    SetGridAt(newPos, Empty);
                    pos = newPos;
                    break;
            }
        }

        var gpsSum = _grid
            .SelectMany((row, y) => row.Select((c, x) => new Vector2(x, y)))
            .Where(p => GridAt(p) == Box)
            .Sum(GpsCoordinate);

        return new(gpsSum.ToString());
    }

    public override ValueTask<string> Solve_2() {
        return new(0.ToString());
    }
}