namespace AdventOfCode;

public class Day22 : BaseDay {
    private readonly long[] _initialSecrets;

    public Day22() : this("") { }

    public Day22(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        _initialSecrets = ParseInput(inputFile);
    }

    private static long[] ParseInput(string file) => File
        .ReadAllText(file).ReplaceLineEndings("\n").Split("\n").Select(long.Parse).ToArray();

    private static long Mix(long a, long b) => a ^ b;
    private static long Prune(long a) => a % 16777216;
    private static int Price(long a) => (int)(a % 10);

    private static IEnumerable<long> EvolveSecret(long secret, int iterations = 2024) {
        for (var i = 0; i < iterations; i++) {
            yield return secret;
            secret = Prune(Mix(secret, secret * 64));
            secret = Prune(Mix(secret, secret / 32));
            secret = Prune(Mix(secret, secret * 2048));
        }
    }

    public override ValueTask<string> Solve_1() => new(
        _initialSecrets.Sum(s => EvolveSecret(s).ElementAt(2000)).ToString()
    );

    public override ValueTask<string> Solve_2() {
        const int capacity = 4;
        var dict = new Dictionary<string, Dictionary<int, long>>();

        for (var i = 0; i < _initialSecrets.Length; i++) {
            var initialSecret = _initialSecrets[i];
            var previousPrice = Price(initialSecret);

            var recentChanges = new Queue<int>(capacity);
            var sequence = EvolveSecret(initialSecret).Skip(1).Take(2000);

            foreach (var secret in sequence) {
                var price = Price(secret);
                var change = price - previousPrice;
                previousPrice = price;

                if (recentChanges.Count >= capacity) recentChanges.Dequeue();
                recentChanges.Enqueue(change);

                if (recentChanges.Count >= capacity) {
                    var key = string.Join(",", recentChanges);
                    if (!dict.ContainsKey(key)) dict[key] = new();
                    dict[key].TryAdd(i, price);
                }
            }
        }

        var (changes, maxBananas) = dict.Keys
            .Select(key => (key, dict[key].Values.Sum()))
            .OrderByDescending(x => x.Item2)
            .First();

        return new(maxBananas.ToString());
    }
}