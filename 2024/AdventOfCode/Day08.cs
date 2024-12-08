using System.Numerics;

namespace AdventOfCode;

public class Day08 : BaseDay {
    private readonly Dictionary<char, List<Vector2>> _antennas;
    private readonly int _width;
    private readonly int _height;

    public Day08() : this("") { }

    public Day08(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        (_antennas, _width, _height) = ParseInput(inputFile);
    }

    private static (Dictionary<char, List<Vector2>>, int, int) ParseInput(string file) {
        var grid = File.ReadAllText(file).ReplaceLineEndings("\n").Split("\n");
        var width = grid.Max(row => row.Length);
        var height = grid.Length;

        var antennas = grid
            .SelectMany((row, y) => row.Select((c, x) => (c, x, y)))
            .Where(node => node.c != '.')
            .GroupBy(node => node.c)
            .ToDictionary(group => group.Key, group => group.Select(node => new Vector2(node.x, node.y)).ToList());

        return (antennas, width, height);
    }

    private bool IsWithinBounds(Vector2 position) => 0 <= position.X && position.X < _width &&
                                                     0 <= position.Y && position.Y < _height;

    private static IEnumerable<(Vector2, Vector2)> GetPairs(List<Vector2> positions) =>
        positions.SelectMany((posA, i) => positions.Skip(i + 1).Select(posB => (posA, posB)));

    public override ValueTask<string> Solve_1() {
        var antinodes = new HashSet<Vector2>();

        foreach (var (_, positions) in _antennas) {
            foreach (var (posA, posB) in GetPairs(positions)) {
                var vecAtoB = posB - posA;
                antinodes.Add(posA - vecAtoB);
                antinodes.Add(posB + vecAtoB);
            }
        }

        var numAntinodes = antinodes.Where(IsWithinBounds).Count();
        return new(numAntinodes.ToString());
    }

    public override ValueTask<string> Solve_2() {
        var antinodes = new HashSet<Vector2>();

        foreach (var (_, positions) in _antennas) {
            foreach (var (posA, posB) in GetPairs(positions)) {
                var vecAtoB = posB - posA;

                var antinode = posA;
                while (IsWithinBounds(antinode)) {
                    antinodes.Add(antinode);
                    antinode += vecAtoB;
                }

                antinode = posB;
                while (IsWithinBounds(antinode)) {
                    antinodes.Add(antinode);
                    antinode -= vecAtoB;
                }
            }
        }

        return new(antinodes.Count.ToString());
    }
}