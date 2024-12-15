using System.Numerics;

namespace AdventOfCode;

public class Day15 : BaseDay {
    private const char Robot = '@';
    private const char Box = 'O';
    private const char Wall = '#';
    private const char Empty = '.';
    private const char BixBoxL = '[';
    private const char BixBoxR = ']';

    private static readonly Dictionary<char, Vector2> _movementDirection = new() {
        { '^', Directions.Up },
        { '>', Directions.Right },
        { 'v', Directions.Down },
        { '<', Directions.Left },
    };

    private readonly char[][] _grid;
    private readonly string _moves;
    public override string InputFilePath { get; } = "Inputs/15-Example.txt";

    public Day15() : this("") { }

    public Day15(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        (_grid, _moves) = ParseInput(inputFile);
    }

    private static (char[][], string) ParseInput(string file) {
        var parts = File.ReadAllText(file).ReplaceLineEndings("\n").Split("\n\n");
        var warehouse = parts[0].Split("\n").Select(row => row.ToCharArray()).ToArray();
        var moves = parts[1].Trim().Replace("\n", "");
        return (warehouse, moves);
    }

    private char GridAt(Vector2 position, char[][] grid = null) =>
        (grid ?? _grid)[(int)position.Y][(int)position.X];

    private void SetGridAt(Vector2 position, char value, char[][] grid = null) =>
        (grid ?? _grid)[(int)position.Y][(int)position.X] = value;

    private char[][] CopyGrid(char[][] grid = null) =>
        (grid ?? _grid).Select(row => (char[])row.Clone()).ToArray();

    [Obsolete("For debugging only")]
    private static void ShowGrid(char[][] grid, Vector2 robot) {
        Console.WriteLine(string.Join("\n", grid.Select((row, y) => string.Concat(
            row.Select((c, x) => x == (int)robot.X && y == (int)robot.Y ? Robot : c)
        ).ToString())) + "\n");
    }

    private Vector2 GetRobotPosition(char[][] grid) {
        var rowIndex = Array.FindIndex(grid, row => row.Contains(Robot));
        var colIndex = Array.IndexOf(grid[rowIndex], Robot);
        var position = new Vector2(colIndex, rowIndex);
        SetGridAt(position, Empty, grid);
        return position;
    }

    private static long GpsCoordinate(Vector2 pos) => 100 * (int)pos.Y + (int)pos.X;

    private char[][] MoveBoxes(char[][] grid) {
        var pos = GetRobotPosition(grid);

        foreach (var move in _moves) {
            var dir = _movementDirection[move];
            var newPos = pos + dir;

            switch (GridAt(newPos, grid)) {
                case Wall:
                    continue;
                case Empty:
                    pos = newPos;
                    continue;
                case Box:
                    var availablePos = newPos;
                    while (GridAt(availablePos, grid) == Box) availablePos += dir;
                    if (GridAt(availablePos, grid) == Wall) continue;

                    SetGridAt(availablePos, Box, grid);
                    SetGridAt(newPos, Empty, grid);
                    pos = newPos;
                    break;
                case BixBoxL:
                    break;
                case BixBoxR:
                    break;
            }
        }

        return grid;
    }

    public override ValueTask<string> Solve_1() {
        var finalGrid = MoveBoxes(CopyGrid(_grid));

        var gpsSum = finalGrid
            .SelectMany((row, y) => row.Select((c, x) => new Vector2(x, y)))
            .Where(p => GridAt(p, finalGrid) == Box)
            .Sum(GpsCoordinate);

        return new(gpsSum.ToString());
    }

    private static char[][] EnlargeWarehouse(char[][] gird) {
        var (width, height) = (gird[0].Length, gird.Length);
        var newWidth = width * 2;
        var newGrid = new char[height][];

        for (var y = 0; y < height; y++) {
            newGrid[y] = new char[newWidth];
            for (var x = 0; x < width; x++) {
                switch (gird[y][x]) {
                    case Wall:
                        newGrid[y][2 * x] = Wall;
                        newGrid[y][2 * x + 1] = Wall;
                        break;
                    case Box:
                        newGrid[y][2 * x] = BixBoxL;
                        newGrid[y][2 * x + 1] = BixBoxR;
                        break;
                    case Empty:
                        newGrid[y][2 * x] = Empty;
                        newGrid[y][2 * x + 1] = Empty;
                        break;
                    case Robot:
                        newGrid[y][2 * x] = Robot;
                        newGrid[y][2 * x + 1] = Empty;
                        break;
                }
            }
        }

        return newGrid;
    }

    public override ValueTask<string> Solve_2() {
        var finalGrid = MoveBoxes(EnlargeWarehouse(_grid));

        var gpsSum = finalGrid
            .SelectMany((row, y) => row.Select((c, x) => new Vector2(x, y)))
            .Where(p => GridAt(p, finalGrid) == Box || GridAt(p, finalGrid) == BixBoxL)
            .Sum(GpsCoordinate);

        return new(gpsSum.ToString());
    }
}