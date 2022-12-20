const parse = (s: string) => s.trim().split('\n').map(Number);

const mix = (arr: number[], numIterations: number = 1, decryptionKey: number = 1): number[] => {
  const length: number = arr.length;
  const refs: number[][] = arr.map(val => [val * decryptionKey]);
  const original: number[][] = [...refs];

  for (let i = 0; i < numIterations; i++) {
    for (const currentRef of original) {
      const value: number = currentRef[0];

      const isNegative: boolean = value < 0;
      if (isNegative) refs.reverse();

      const currentIndex = refs.findIndex(ref => ref === currentRef);
      const newIndex = (currentIndex + Math.abs(value)) % (length - 1);

      refs.splice(currentIndex, 1);
      refs.splice(newIndex, 0, currentRef);

      if (isNegative) refs.reverse();
    }
  }

  return refs.flat();
};

const findValueAt = (index: number, arr: number[]): number => {
  const arrLength: number = arr.length;
  const indexOfZero: number = arr.findIndex(val => val === 0);
  index = (indexOfZero + index) % arrLength;
  return arr[index];
};

const decrypt = (s: string, numIterations: number = 1, decryptionKey: number = 1): number => {
  const mixed: number[] = mix(parse(s), numIterations, decryptionKey);
  return [1000, 2000, 3000]
    .map(index => findValueAt(index, mixed))
    .reduce((acc: number, n: number) => acc + n, 0);
};

export const part1 = (s: string): number => decrypt(s);

exports.first = part1;

export const part2 = (s: string): number => decrypt(s, 10, 811589153);

exports.second = part2;
