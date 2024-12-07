// working solution for day 15, but later switched to a more efficient solution

const manhattanDistance = (a: number[], b: number[]): number =>
  a.reduce(
    (sum: number, num: number, i: number) => sum + Math.abs(num - b[i]),
    0,
  );

const parse = (s: string): number[][] =>
  s
    .trim()
    .split('\n')
    .map((line) => line.match(/(-?\d+)/g)!.map(Number))
    .map(([sx, sy, bx, by]: number[]) => [
      sx,
      sy,
      bx,
      by,
      manhattanDistance([sx, sy], [bx, by]),
    ]);

const mergeIntervals = (intervals: number[][]): number[][] => {
  // sort intervals by start position
  intervals.sort((a: number[], b: number[]) => a[0] - b[0]);

  const mergedIntervals: number[][] = [];

  // merge overlapping intervals
  let previous: number[] = intervals[0];
  for (let i = 1; i < intervals.length; i++) {
    const current: number[] = intervals[i];

    const [previousStart, previousEnd] = previous;
    const [currentStart, currentEnd] = current;

    if (previousEnd >= currentStart) {
      previous = [previousStart, Math.max(previousEnd, currentEnd)];
    } else {
      mergedIntervals.push(previous);
      previous = current;
    }
  }
  mergedIntervals.push(previous);

  return mergedIntervals;
};

const getLineCoverageOfSensor = (
  sensor: number[],
  targetY: number,
): number[] | null => {
  const [sx, sy, , , dist] = sensor;
  const coverageWidth = dist - Math.abs(sy - targetY);

  // sensor is not in range
  if (coverageWidth <= 0) return null;
  return [sx - coverageWidth, sx + coverageWidth];
};

const getLineCoverage = (data: number[][], targetY: number): number[][] => {
  const coverageIntervals: number[][] = [];

  data.forEach((sensorData: number[]) => {
    const sensorCoverage = getLineCoverageOfSensor(sensorData, targetY);
    if (sensorCoverage) coverageIntervals.push(sensorCoverage);
  });

  return mergeIntervals(coverageIntervals);
};

export const part1 = (s: string, targetY: number): number =>
  getLineCoverage(parse(s), targetY).reduce(
    (sum: number, [start, end]: number[]) => sum + (end - start),
    0,
  );

exports.first = part1;

export const part2 = (s: string): number => {
  const data = parse(s);
  const maxY = 4_000_000;

  for (let targetY = 0; targetY < maxY; targetY++) {
    const coverage = getLineCoverage(data, targetY);

    // check if there is a gap in the coverage
    if (coverage.length > 1) {
      const [, end] = coverage[0];
      return (end + 1) * 4_000_000 + targetY;
    }
  }

  // no gap found
  return -1;
};

exports.second = part2;
