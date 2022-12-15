// compare function for dat 13
const compare = (a: any, b: any): number => {
  if (a === b) return 0;
  if (a === undefined) return -1;
  if (b === undefined) return 1;

  if (typeof a === 'number' && typeof b === 'number') return a - b;
  if (typeof a === 'number') return compare([a], b);
  if (typeof b === 'number') return compare(a, [b]);

  for (const [aa, bb] of zip(a, b)) {
    const r = compare(aa, bb);
    if (r === 0) continue;
    return r;
  }

  return 0;
};

const zip = (a: any[], b: any[]): any[][] => {
  const result: any[][] = [];

  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    result.push([a[i], b[i]]);
  }

  return result;
};
