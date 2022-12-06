const allUniqueChars = (s: string) => s.length === new Set(s).size;

const findMessageStart = (message: string, markerLength: number) => message
  .split('')
  .map((char: string, i: number) => message.substring(i, i + markerLength))
  .filter((chunk: string) => chunk.length === markerLength)
  .findIndex((chunk: string) => allUniqueChars(chunk)) + markerLength;

export const part1 = (s: string) => findMessageStart(s.trim(), 4);

exports.first = part1;

export const part2 = (s: string) => findMessageStart(s.trim(), 14);

exports.second = part2;
