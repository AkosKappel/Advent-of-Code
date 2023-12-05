const parse = (input) => {
  const [seedLine, ...maps] = input.split('\n\n');
  const seeds = seedLine.split(' ').slice(1).map(Number);
  const mapsByType = maps.map((map) => {
    const [type, ...lines] = map.split('\n');
    return lines.reduce((acc, line) => {
      const [dst, src, range] = line.split(' ').map(Number);
      acc.push({ src, dst, range: range - 1 });
      return acc;
    }, []);
  });
  return { seeds, mapsByType };
};

const part1 = (input) => {
  const { seeds, mapsByType } = parse(input);
  return seeds
    .map((seed) => {
      let value = seed;
      mapsByType.forEach(map => {
        for (const { src, dst, range } of map) {
          if (src <= value && value <= src + range) {
            value = dst + (value - src);
            break;
          }
        }
      });
      return value;
    })
    .reduce((acc, value) => Math.min(acc, value), Infinity);
};

const sliceRange = ([start, end], ranges) => {
  ranges.sort((a, b) => a[0] - b[0]); // Sort the ranges by start value
  const result = [];

  let current = start;
  for (const [rangeStart, rangeEnd] of ranges) {
    if (end < rangeStart) break;
    if (rangeEnd < start) continue;

    let adjustedRange = [
      Math.max(rangeStart, start),
      Math.min(rangeEnd, end),
    ];

    // Add overflowing part of input range before the current range
    if (current < adjustedRange[0]) {
      result.push([current, adjustedRange[0] - 1]);
    }

    result.push(adjustedRange);
    current = adjustedRange[1] + 1;
  }

  // Add overflowing part of input range before the last range
  if (current <= end) {
    result.push([current, end]);
  }

  return result;
};

const part2 = (input) => {
  const { seeds, mapsByType } = parse(input);

  // transform seeds from [1, 2, 3, 4] to [[1, 1 + 2], [3, 3 + 4]]
  let seedsRanges = seeds.reduce((acc, seed, i) => {
    if (i % 2 === 0) acc.push([seed, seed + seeds[i + 1] - 1]);
    return acc;
  }, []);

  // go through each source-2-destination mapping
  for (const map of mapsByType) {
    const newRanges = [];
    const ranges = map.map(({ src, range }) => ([src, src + range]));

    for (const seedRange of seedsRanges) {
      // slice the seed range into smaller ranges based on the mapping ranges
      // and map each of the smaller ranges to their destination range
      const mappedRanges = sliceRange(seedRange, ranges)
        .map(([start, end]) => {
          // map the starting point of the range
          for (const { src, dst, range } of map) {
            if (src <= start && start <= src + range) {
              start = dst + (start - src);
              break;
            }
          }
          // map the ending point of the range
          for (const { src, dst, range } of map) {
            if (src <= end && end <= src + range) {
              end = dst + (end - src);
              break;
            }
          }
          return [start, end];
        });
      newRanges.push(...mappedRanges);
    }

    seedsRanges = newRanges;
  }

  return seedsRanges.reduce((acc, [start, _]) =>
    Math.min(acc, start), Infinity);
};

module.exports = { part1, part2 };
