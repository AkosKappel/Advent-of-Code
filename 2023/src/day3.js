const slice = (str, start, end) => str
  ?.slice(
    Math.max(0, start),
    Math.min(end, str.length),
  );

const hasNeighborSymbol = str => str
  ?.replaceAll('.', '')
  .replaceAll(/\d/g, '')
  .length;

const part1 = (input) => {
  let sum = 0;
  const lines = input.split('\n');

  lines.forEach((line, row) => {
    for (let i = 0; i < line.length; i++) {
      if (line[i].match(/\d/)) {
        const number = line.slice(i, line.length).match(/^\d+/)[0];

        // get symbols around number
        const left = line[i - 1];
        const right = line[i + number.length];
        const top = slice(lines[row - 1], i - 1, i + number.length + 1);
        const bottom = slice(lines[row + 1], i - 1, i + number.length + 1);

        // if any array of symbols contains not a dot, add to sum
        if ([left, right, top, bottom].some(hasNeighborSymbol)) {
          sum += Number(number);
        }

        // jump to the end of number
        i += number.length - 1;
      }
    }
  });

  return sum;
};

const getNeighborNumbers = (line, i, dist = 1) =>
  [...line?.matchAll(/\d+/g) || []]
    .map(match => ({
      start: match.index,
      end: match.index + match[0].length - 1,
      value: match[0],
    }))
    // keep only matches whose index (start or end) is within 1 step from symbol
    .filter(match =>
      Math.abs(match.start - i) <= dist || Math.abs(match.end - i) <= dist)
    .map(match => match.value);

const part2 = (input) => {
  let sum = 0;
  const lines = input.split('\n');

  lines.forEach((line, row) => {
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '*') {
        // get numbers around symbol
        const left = line.slice(0, i).match(/\d+$/)?.[0];
        const right = line.slice(i + 1, line.length).match(/^\d+/)?.[0];
        const top = getNeighborNumbers(lines[row - 1], i);
        const bottom = getNeighborNumbers(lines[row + 1], i);

        // add only if exactly 2 numbers around symbol
        const nonNull = [left, right, ...top, ...bottom].filter(Boolean);
        if (nonNull.length === 2) {
          sum += nonNull.reduce((acc, cur) => acc * Number(cur), 1);
        }
      }
    }
  });

  return sum;
};

module.exports = { part1, part2 };
