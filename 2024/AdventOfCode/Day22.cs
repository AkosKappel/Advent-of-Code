namespace AdventOfCode;

public class Day22 : BaseDay {
    private readonly long[] _initialSecrets;
    // public override string InputFilePath { get; } = "Inputs/22-Example.txt";

    public Day22() : this("") { }

    public Day22(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        _initialSecrets = ParseInput(inputFile);
    }

    private static long[] ParseInput(string file) => File
        .ReadAllText(file).ReplaceLineEndings("\n").Split("\n").Select(long.Parse).ToArray();

    private static long EvolveSecret(long secret, int iterations) {
        for (var i = 0; i < iterations; i++) {
            secret = Prune(Mix(secret, secret * 64));
            secret = Prune(Mix(secret, secret / 32));
            secret = Prune(Mix(secret, secret * 2048));
        }

        return secret;

        long Mix(long a, long b) => a ^ b;
        long Prune(long a) => a % 16777216;
    }

    public override ValueTask<string> Solve_1() => new(
        _initialSecrets.Sum(s => EvolveSecret(s, 2000)).ToString()
    );

    public override ValueTask<string> Solve_2() {
        return new(0.ToString());
    }
}