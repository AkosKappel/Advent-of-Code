const compare = (a: any, b: any): number => {
  if (a === b) {
    return 0;
  }

  if (a === undefined) {
    return -1;
  }

  if (b === undefined) {
    return 1;
  }

  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  if (typeof a === 'number') {
    return compare([a], b);
  }

  if (typeof b === 'number') {
    return compare(a, [b]);
  }

  // TODO: zip
  // for (const [aa, bb] of zip_.all(b, a)) {
  //   const r = compare(aa, bb);
  //
  //   if (r === 0) {
  //     continue;
  //   }
  //
  //   return r;
  // }

  return 0;
};
