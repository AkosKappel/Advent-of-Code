using System.Numerics;

namespace AdventOfCode;

public class Day15 : BaseDay {
    private const char Robot = '@';
    private const char Box = 'O';
    private const char Wall = '#';
    private const char Empty = '.';
    private const char BixBoxL = '[';
    private const char BixBoxR = ']';

    private static readonly Dictionary<char, Vector2> MovementDirection = new() {
        { '^', Directions.Up },
        { '>', Directions.Right },
        { 'v', Directions.Down },
        { '<', Directions.Left },
    };

    private readonly char[][] _grid;
    private readonly string _moves;

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
    private static void ShowGrid(char[][] grid) {
        Console.WriteLine(string.Join("\n", grid.Select(row => string.Concat(row))) + "\n");
    }

    private static Vector2 GetRobotPosition(char[][] grid) {
        var rowIndex = Array.FindIndex(grid, row => row.Contains(Robot));
        var colIndex = Array.IndexOf(grid[rowIndex], Robot);
        return new Vector2(colIndex, rowIndex);
    }

    private static long GpsCoordinate(Vector2 pos) => 100 * (int)pos.Y + (int)pos.X;

    private void Swap(Vector2 pos1, Vector2 pos2, char[][] grid) {
        var val1 = GridAt(pos1, grid);
        var val2 = GridAt(pos2, grid);
        if (val1 == val2) return;
        SetGridAt(pos1, val2, grid);
        SetGridAt(pos2, val1, grid);
    }

    private bool CanMove(Vector2 pos, Vector2 dir, char[][] grid) {
        var newPos = pos + dir;

        switch (GridAt(newPos, grid)) {
            case Wall:
                return false;
            case Empty:
                return true;
            case Box:
                var nonBoxPos = newPos;
                while (GridAt(nonBoxPos, grid) == Box) nonBoxPos += dir;
                return GridAt(nonBoxPos, grid) != Wall;
            case BixBoxL when dir.IsHorizontal():
            case BixBoxR when dir.IsHorizontal():
                return CanMove(newPos, dir, grid);
            case BixBoxL when dir.IsVertical():
            case BixBoxR when dir.IsVertical():
                var leftHalf = GridAt(newPos, grid) == BixBoxL ? newPos : newPos with { X = newPos.X - 1 };
                var rightHalf = GridAt(newPos, grid) == BixBoxR ? newPos : newPos with { X = newPos.X + 1 };
                return CanMove(leftHalf, dir, grid) && CanMove(rightHalf, dir, grid);
        }

        throw new("Unexpected grid value at " + newPos);
    }

    private void MakeMove(Vector2 pos, Vector2 dir, char[][] grid) {
        var newPos = pos + dir;

        switch (GridAt(newPos, grid)) {
            case Wall:
                return;
            case Empty:
                Swap(pos, newPos, grid);
                return;
            case Box:
                var nonBoxPos = newPos;
                while (GridAt(nonBoxPos, grid) == Box) nonBoxPos += dir;
                if (GridAt(nonBoxPos, grid) == Wall) return;

                Swap(newPos, nonBoxPos, grid); // move first box to empty space behind last box
                Swap(pos, newPos, grid); // move robot 1 step ahead to moved box's position
                return;
            case BixBoxL when dir.IsHorizontal():
            case BixBoxR when dir.IsHorizontal():
                MakeMove(newPos, dir, grid); // move everything that is in the way 1 step ahead
                Swap(pos, newPos, grid); // move robot to newly created empty space
                return;
            case BixBoxL when dir.IsVertical():
            case BixBoxR when dir.IsVertical():
                var leftHalf = GridAt(newPos, grid) == BixBoxL ? newPos : newPos with { X = newPos.X - 1 };
                var rightHalf = GridAt(newPos, grid) == BixBoxR ? newPos : newPos with { X = newPos.X + 1 };
                MakeMove(leftHalf, dir, grid);
                MakeMove(rightHalf, dir, grid);
                Swap(pos, newPos, grid);
                return;
        }

        throw new("Unexpected grid value at " + newPos);
    }

    private char[][] MoveBoxes(char[][] grid) {
        var pos = GetRobotPosition(grid);
        var isPart2 = grid.Any(row => row.Contains(BixBoxL));

        foreach (var move in _moves) {
            var dir = MovementDirection[move];
            if (CanMove(pos, dir, grid)) {
                MakeMove(pos, dir, grid);
                pos += dir;
            }
        }

        return grid;
    }

    public override ValueTask<string> Solve_1() {
        var finalGrid = MoveBoxes(CopyGrid(_grid));

        var gpsSum = finalGrid
            .SelectMany((row, y) => row.Select((c, x) => new Vector2(x, y)))
            .Where(pos => GridAt(pos, finalGrid) == Box)
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