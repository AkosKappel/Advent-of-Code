namespace AdventOfCode;

public class Day11 : BaseDay {
    private readonly Dictionary<long, long> _stones;

    public Day11() : this("") { }

    public Day11(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        _stones = ParseInput(inputFile);
    }

    private static Dictionary<long, long> ParseInput(string file) => File
        .ReadAllText(file)
        .Split(" ")
        .Select(long.Parse)
        .GroupBy(number => number)
        .ToDictionary(group => group.Key, group => (long)group.Count());

    private static Dictionary<long, long> Blink(Dictionary<long, long> stones) {
        var newStones = new Dictionary<long, long>();

        foreach (var (stone, count) in stones) {
            if (stone == 0) {
                newStones.TryAdd(1, 0);
                newStones[1] += count;
                continue;
            }

            var numDigits = stone.ToString().Length;
            if (numDigits % 2 == 0) {
                var leftStone = stone / (long)Math.Pow(10, (double)numDigits / 2);
                var rightStone = stone % (long)Math.Pow(10, (double)numDigits / 2);

                newStones.TryAdd(leftStone, 0);
                newStones[leftStone] += count;

                newStones.TryAdd(rightStone, 0);
                newStones[rightStone] += count;
                continue;
            }

            var newStone = stone * 2024;
            newStones.TryAdd(newStone, 0);
            newStones[newStone] += count;
        }

        return newStones;
    }

    private static Dictionary<long, long> Blink(Dictionary<long, long> stones, int times) => Enumerable
        .Range(0, times)
        .Aggregate(stones, (s, _) => Blink(s));

    public override ValueTask<string> Solve_1() {
        const int timesToBlink = 25;
        var stones = Blink(_stones, timesToBlink);
        return new(stones.Values.Sum().ToString());
    }

    public override ValueTask<string> Solve_2() {
        const int timesToBlink = 75;
        var stones = Blink(_stones, timesToBlink);
        return new(stones.Values.Sum().ToString());
    }
}