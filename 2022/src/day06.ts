const parse = (s: string) => s.trim();

const allUnique = (s: string) => s.length === new Set(s).size;

export const part1 = (s: string) => {
  const signal = parse(s);
  const markerLength = 4;
  let marker = signal.substring(0, markerLength);

  let i = markerLength;
  while (!allUnique(marker)) {
    i++;
    marker = signal.substring(i - markerLength, i);
  }

  return i;
};

exports.first = part1;

export const part2 = (s: string) => {
  const signal = parse(s);
  const markerLength = 14;
  let marker = signal.substring(0, markerLength);

  let i = markerLength;
  while (!allUnique(marker)) {
    i++;
    marker = signal.substring(i - markerLength, i);
  }

  return i;
};

exports.second = part2;
