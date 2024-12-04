using System.Numerics;

namespace AdventOfCode;

public class Day04 : BaseDay
{
    private readonly string _input;
    public override string InputFilePath { get; } = "Inputs/04-Example.txt";

    public Day04() : this("")
    {
    }

    public Day04(string filename = "")
    {
        _input = File.ReadAllText(string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename);
    }

    private static class Directions
    {
        public static readonly Vector2 Up = Vector2.UnitY * -1;
        public static readonly Vector2 Down = Vector2.UnitY;
        public static readonly Vector2 Left = Vector2.UnitX * -1;
        public static readonly Vector2 Right = Vector2.UnitX;
        public static readonly Vector2 UpRight = Up + Right;
        public static readonly Vector2 UpLeft = Up + Left;
        public static readonly Vector2 DownRight = Down + Right;
        public static readonly Vector2 DownLeft = Down + Left;

        public static readonly Vector2[] Vertical = { Up, Down };
        public static readonly Vector2[] Horizontal = { Left, Right };
        public static readonly Vector2[] Cardinal = { Up, Down, Left, Right };
        public static readonly Vector2[] Diagonal = { UpRight, UpLeft, DownRight, DownLeft };
        public static readonly Vector2[] All = { Up, Down, Left, Right, UpRight, UpLeft, DownRight, DownLeft };
    }

    private string[] Grid => ParseInput();
    private int Height => Grid.Length;
    private int Width => Grid[0].Length;


    private string[] ParseInput() => _input.Split("\n").Select(line => line.Trim()).ToArray();

    private bool IsWithinBounds(Vector2 position) =>
        0 <= position.X && position.X < Width &&
        0 <= position.Y && position.Y < Height;

    private char GridAt(Vector2 position) => IsWithinBounds(position) ? Grid[(int)position.Y][(int)position.X] : ' ';

    private bool CheckWord(Vector2 position, Vector2 direction, string word) => word
        .Select((c, idx) => (c, idx))
        .All(t => GridAt(position + t.idx * direction) == t.c);

    public override ValueTask<string> Solve_1()
    {
        const string word = "XMAS";

        var numFound = Grid
            .SelectMany((row, y) => row.Select((_, x) => new Vector2(x, y)))
            .Where(pos => GridAt(pos) == word[0])
            .Sum(pos => Directions.All.Count(dir => CheckWord(pos, dir, word)));

        return new(numFound.ToString());
    }

    private bool CheckXWord(Vector2 position, string word)
    {
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

    public override ValueTask<string> Solve_2()
    {
        const string word = "MAS";

        var numFound = Grid
            .SelectMany((row, y) => row.Select((_, x) => new Vector2(x, y)))
            .Where(pos => GridAt(pos) == word[1])
            .Count(pos => CheckXWord(pos, word));

        return new(numFound.ToString());
    }
}