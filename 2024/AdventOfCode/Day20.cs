using System.Numerics;

namespace AdventOfCode;

public class Day20 : BaseDay {
    private const char Empty = '.';
    private const char Wall = '#';

    private readonly string[] _racetrack;

    public Day20() : this("") { }

    public Day20(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        _racetrack = ParseInput(inputFile);
    }

    private static string[] ParseInput(string file) =>
        File.ReadAllText(file).ReplaceLineEndings("\n").Split("\n");

    private static Vector2 FindPosition(string[] track, char c) {
        var y = Array.FindIndex(track, row => row.Contains(c));
        var x = track[y].IndexOf(c);
        return new Vector2(x, y);
    }

    private static List<Vector2> GetPath(string[] track) {
        var start = FindPosition(track, 'S');
        var end = FindPosition(track, 'E');

        var current = start;
        var path = new List<Vector2> { current };

        while (current != end) {
            current = Directions.Orthogonal
                .Select(dir => current + dir)
                .First(neighbor =>
                    track[(int)neighbor.Y][(int)neighbor.X] != Wall &&
                    !path.TakeLast(2).Contains(neighbor)
                );

            path.Add(current);
        }

        return path;
    }

    private static int ManhattanDistance(Vector2 a, Vector2 b) => (int)(Math.Abs(a.X - b.X) + Math.Abs(a.Y - b.Y));

    private static int CountCheats(List<Vector2> path, int allowedCheatTime, int minTimeToSave = 100) {
        var numCheats = 0;

        for (var i = 0; i < path.Count - minTimeToSave; i++) {
            for (var j = i; j < path.Count; j++) {
                var cheatStart = path[i];
                var cheatEnd = path[j];

                var cheatTime = ManhattanDistance(cheatStart, cheatEnd);
                if (cheatTime > allowedCheatTime) continue;

                var savedTime = j - i - cheatTime;
                if (savedTime < minTimeToSave) continue;

                numCheats++;
            }
        }

        return numCheats;
    }

    public override ValueTask<string> Solve_1() => new(
        CountCheats(GetPath(_racetrack), allowedCheatTime: 2).ToString()
    );

    public override ValueTask<string> Solve_2() => new(
        CountCheats(GetPath(_racetrack), allowedCheatTime: 20).ToString()
    );
}