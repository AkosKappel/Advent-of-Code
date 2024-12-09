namespace AdventOfCode;

public class Day09 : BaseDay {
    private readonly List<int> _diskMap;
    private const int Empty = -1;

    public Day09() : this("") { }

    public Day09(string filename) {
        var inputFile = string.IsNullOrWhiteSpace(filename) ? InputFilePath : filename;
        _diskMap = ParseInput(inputFile);
    }

    private static List<int> ParseInput(string file) => File.ReadAllText(file).Trim().Select(c => c - '0').ToList();

    private static int[] ReadDisk(IEnumerable<int> map) => map
        .SelectMany((n, i) => Enumerable.Repeat(i % 2 == 0 ? i / 2 : Empty, n)).ToArray();

    private static long CalculateChecksum(IEnumerable<int> map) =>
        map.Select((n, i) => n == Empty ? 0 : (long)n * i).Sum();

    public override ValueTask<string> Solve_1() {
        var disk = ReadDisk(_diskMap);

        var (left, right) = (0, disk.Length - 1);

        while (left < right) {
            if (disk[left] == Empty) {
                if (disk[right] != Empty) {
                    disk[left] = disk[right];
                    disk[right] = Empty;
                    left++;
                }

                right--;
            }
            else {
                left++;
            }
        }

        return new(CalculateChecksum(disk).ToString());
    }

    public override ValueTask<string> Solve_2() {
        var disk = ReadDisk(_diskMap);

        var right = disk.Length - 1;
        while (right > 0) {
            // find next fragment from right
            while (disk[right] == Empty) right--;
            var fileId = disk[right];

            // get fragment size
            var fileSize = 1;
            while (disk[--right] == fileId) fileSize++;
            right++;

            // find empty slot with enough space
            var left = 0;
            var emptySize = 0;
            var fragmented = false;
            while (emptySize < fileSize && left < right) {
                if (disk[left] == Empty) {
                    emptySize++;
                    fragmented = true;
                }
                else {
                    emptySize = 0;
                }

                left++;
            }

            if (!fragmented) break;

            if (emptySize >= fileSize) {
                left -= emptySize;
                // move fragment to empty slot
                for (var i = 0; i < fileSize; i++) {
                    disk[left + i] = fileId;
                    disk[right + i] = Empty;
                }
            }

            right--;
        }

        return new(CalculateChecksum(disk).ToString());
    }
}