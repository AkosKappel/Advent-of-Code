const allUnique = (s: string) => s.length === new Set(s).size;

const getMessageStart = (s: string, markerLength: number): number => {
  const signal = s.trim();
  let marker = signal.substring(0, markerLength);

  let i = markerLength;
  while (!allUnique(marker)) {
    i++;
    if (i > signal.length) throw new Error(`No message start sequence found in signal ${signal}`);
    marker = signal.substring(i - markerLength, i);
  }

  return i;
};

export const part1 = (s: string) => getMessageStart(s, 4);

exports.first = part1;

export const part2 = (s: string) => getMessageStart(s, 14);

exports.second = part2;
