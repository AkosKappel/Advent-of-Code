namespace AdventOfCode;

public class Day05 : BaseDay {
    private readonly List<List<int>> _updates;
    private readonly Dictionary<int, HashSet<int>> _ordering; // describes which values must come after value of key

    public Day05() : this("") { }

    public Day05(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        (var pageOrderRules, _updates) = ParseInput(inputFile);

        _ordering = pageOrderRules
            .GroupBy(rule => rule.First())
            .ToDictionary(
                g => g.Key,
                g => g.Select(rule => rule.Last()).ToHashSet()
            );
    }

    private static (List<List<int>>, List<List<int>>) ParseInput(string file) {
        var raw = File.ReadAllText(file).ReplaceLineEndings("\n").Split("\n\n");
        var rules = raw[0].Split("\n").Select(row => row.Split("|").Select(int.Parse).ToList()).ToList();
        var updates = raw[1].Split("\n").Select(row => row.Split(",").Select(int.Parse).ToList()).ToList();
        return (rules, updates);
    }

    private static int GetMiddlePage(List<int> pages) => pages[pages.Count / 2];

    private bool IsCorrectlyOrdered(List<int> update) => update
        .Select((value, index) => (
            // ValuesBefore: update.Take(index).ToHashSet(),
            Current: value,
            ValuesAfter: update.Skip(index + 1).ToHashSet()
        ))
        .All(x => {
            var allowedAfter = _ordering.GetValueOrDefault(x.Current, new HashSet<int>());
            return allowedAfter.IsSupersetOf(x.ValuesAfter);
        });

    public override ValueTask<string> Solve_1() => new(_updates
        .Where(IsCorrectlyOrdered)
        .Sum(GetMiddlePage)
        .ToString()
    );

    private List<int> FixOrdering(List<int> update) {
        update.Sort((a, b) => {
            // order by most matches to least matches according to ordering rules
            var aMatches = _ordering.GetValueOrDefault(a, new HashSet<int>()).Intersect(update);
            var bMatches = _ordering.GetValueOrDefault(b, new HashSet<int>()).Intersect(update);
            return bMatches.Count().CompareTo(aMatches.Count());
        });
        return update;
    }

    public override ValueTask<string> Solve_2() => new(_updates
        .Where(x => !IsCorrectlyOrdered(x))
        .Select(FixOrdering)
        .Sum(GetMiddlePage)
        .ToString()
    );
}