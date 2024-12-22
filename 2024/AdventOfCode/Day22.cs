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

    private static IEnumerable<long> NextSecret(long secret, int iterations = 2024) {
        for (var i = 0; i < iterations; i++) {
            yield return secret;
            secret = Prune(Mix(secret, secret * 64));
            secret = Prune(Mix(secret, secret / 32));
            secret = Prune(Mix(secret, secret * 2048));
        }
    }

    public override ValueTask<string> Solve_1() => new(
        _initialSecrets.Sum(s => NextSecret(s).ElementAt(2000)).ToString()
    );

    public override ValueTask<string> Solve_2() {
        const int nLastChanges = 4;
        var results = new Dictionary<string, int>();
        var recentChanges = new Queue<int>(nLastChanges);

        foreach (var initialSecret in _initialSecrets) {
            var previousPrice = Price(initialSecret);
            var dict = new Dictionary<string, int>();
            recentChanges.Clear();

            foreach (var secret in NextSecret(initialSecret).Skip(1).Take(2000)) {
                var price = Price(secret);
                var change = price - previousPrice;
                previousPrice = price;

                if (recentChanges.Count >= nLastChanges) recentChanges.Dequeue();
                recentChanges.Enqueue(change);
                if (recentChanges.Count < nLastChanges) continue;

                dict.TryAdd(string.Join(",", recentChanges), price);
            }

            foreach (var (id, price) in dict) {
                results[id] = results.GetValueOrDefault(id, 0) + price;
            }
        }

        return new(results.Values.Max().ToString());
    }
}