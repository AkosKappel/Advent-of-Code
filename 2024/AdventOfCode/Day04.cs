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
        var firstChar = word.First();
        var lastChar = word.Last();
        var word1 = $"{firstChar}{lastChar}{firstChar}{lastChar}";
        var word2 = $"{firstChar}{firstChar}{lastChar}{lastChar}";
        var word3 = $"{lastChar}{firstChar}{lastChar}{firstChar}";
        var word4 = $"{lastChar}{lastChar}{firstChar}{firstChar}";

        var cornerChars = Directions.Diagonal.Select(dir => GridAt(position + dir));
        var targetWord = string.Join("", cornerChars);
        return targetWord == word1 || targetWord == word2 || targetWord == word3 || targetWord == word4;
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