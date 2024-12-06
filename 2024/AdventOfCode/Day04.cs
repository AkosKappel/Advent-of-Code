using System.Numerics;

namespace AdventOfCode;

public class Day04 : BaseDay {
    private readonly string[] _grid;
    private readonly int _height;
    private readonly int _width;

    public Day04() : this("") { }

    public Day04(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        _grid = ParseInput(inputFile);
        _height = _grid.Length;
        _width = _grid[0].Length;
    }

    private static string[] ParseInput(string file) => File
        .ReadAllText(file)
        .Split("\n")
        .Select(line => line.Trim())
        .ToArray();

    private bool IsWithinBounds(Vector2 position) =>
        0 <= position.X && position.X < _width &&
        0 <= position.Y && position.Y < _height;

    private char GridAt(Vector2 position) => IsWithinBounds(position) ? _grid[(int)position.Y][(int)position.X] : ' ';

    private bool CheckWord(Vector2 position, Vector2 direction, string word) => word
        .Select((c, idx) => (c, idx))
        .All(t => GridAt(position + t.idx * direction) == t.c);

    public override ValueTask<string> Solve_1() {
        const string word = "XMAS";

        var numFound = _grid
            .SelectMany((row, y) => row.Select((_, x) => new Vector2(x, y)))
            .Where(pos => GridAt(pos) == word[0])
            .Sum(pos => Directions.All.Count(dir => CheckWord(pos, dir, word)));

        return new(numFound.ToString());
    }

    private bool CheckXWord(Vector2 position, string word) {
        var word1 = $"{word.First()}{word.Last()}";
        var word2 = $"{word.Last()}{word.First()}";

        var diagonal1 = $"{GridAt(position + Directions.UpLeft)}{GridAt(position + Directions.DownRight)}";
        if (diagonal1 != word1 && diagonal1 != word2) return false;

        var diagonal2 = $"{GridAt(position + Directions.UpRight)}{GridAt(position + Directions.DownLeft)}";
        return diagonal2 == word1 || diagonal2 == word2;
    }

    public override ValueTask<string> Solve_2() {
        const string word = "MAS";

        var numFound = _grid
            .SelectMany((row, y) => row.Select((_, x) => new Vector2(x, y)))
            .Where(pos => GridAt(pos) == word[1])
            .Count(pos => CheckXWord(pos, word));

        return new(numFound.ToString());
    }
}