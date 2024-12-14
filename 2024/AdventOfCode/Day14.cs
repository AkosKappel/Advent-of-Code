using System.Numerics;
using System.Text;
using System.Text.RegularExpressions;

namespace AdventOfCode;

public class Day14 : BaseDay {
    private record Robot(Vector2 Position, Vector2 Velocity);

    private const char RobotChar = '#';
    private const char EmptyChar = '.';

    private readonly List<Robot> _robots;
    private readonly int _width;
    private readonly int _height;
    // public override string InputFilePath { get; } = "Inputs/14-Example.txt";

    public Day14() : this("") { }

    public Day14(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        _robots = ParseInput(inputFile);
        _width = inputFile.Contains("Example") ? 11 : 101;
        _height = inputFile.Contains("Example") ? 7 : 103;
    }

    private static List<Robot> ParseInput(string file) {
        var lines = File.ReadAllText(file).ReplaceLineEndings("\n").Split("\n");
        var regex = new Regex(@"p=(?<px>-?\d+),(?<py>-?\d+) v=(?<vx>-?\d+),(?<vy>-?\d+)");
        return lines.Select(line => {
            var match = regex.Match(line);
            return new Robot(
                new Vector2(int.Parse(match.Groups["px"].Value), int.Parse(match.Groups["py"].Value)),
                new Vector2(int.Parse(match.Groups["vx"].Value), int.Parse(match.Groups["vy"].Value))
            );
        }).ToList();
    }

    private Robot PredictState(Robot robot, int time) => robot with {
        Position = new Vector2(
            ((robot.Position.X + robot.Velocity.X * time) % _width + _width) % _width,
            ((robot.Position.Y + robot.Velocity.Y * time) % _height + _height) % _height
        )
    };

    private int[] CountRobotsInQuadrants(List<Robot> robots) => new[] {
        robots.Count(r => r.Position.X < (float)(_width - 1) / 2 && r.Position.Y < (float)(_height - 1) / 2),
        robots.Count(r => r.Position.X > (float)(_width - 1) / 2 && r.Position.Y < (float)(_height - 1) / 2),
        robots.Count(r => r.Position.X < (float)(_width - 1) / 2 && r.Position.Y > (float)(_height - 1) / 2),
        robots.Count(r => r.Position.X > (float)(_width - 1) / 2 && r.Position.Y > (float)(_height - 1) / 2),
    };

    private string DrawImage(List<Robot> robots) {
        var positions = robots
            .GroupBy(r => r.Position)
            .ToDictionary(g => g.Key, g => g.Count());

        var sb = new StringBuilder();
        sb.AppendLine();

        for (var y = 0; y < _height; y++) {
            for (var x = 0; x < _width; x++) {
                var count = positions.GetValueOrDefault(new Vector2(x, y), 0);
                sb.Append(count > 0 ? RobotChar : EmptyChar);
            }

            sb.AppendLine();
        }

        return sb.ToString();
    }

    public override ValueTask<string> Solve_1() {
        const int time = 100;
        var robots = _robots.Select(r => PredictState(r, time)).ToList();
        var safeteFactor = CountRobotsInQuadrants(robots).Aggregate(1, (a, b) => a * b);
        return new(safeteFactor.ToString());
    }

    public override ValueTask<string> Solve_2() {
        var target = new string(RobotChar, 31);

        for (var time = 0; time < 10_000; time++) {
            var robots = _robots.Select(r => PredictState(r, time)).ToList();
            var image = DrawImage(robots);

            if (image.Contains(target)) {
                Console.WriteLine(image);
                return new(time.ToString());
            }
        }

        return new((-1).ToString());
    }
}