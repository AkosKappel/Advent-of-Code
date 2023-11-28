// functional solution for day 8

const sliceLTRB = (i: number, j: number, data: number[][]) => {
  return [
    data[i].slice(0, j).reverse(),
    data.slice(0, i).map((e) => e[j]).reverse(),
    data[i].slice(j + 1, data[i].length),
    data.slice(i + 1, data.length).map((e) => e[j]),
  ];
};

const isVisible = (i: number, j: number, data: number[][]): boolean => {
  return sliceLTRB(i, j, data)
    .map((slice) => Math.max(...slice))
    .some((max) => max < data[i][j]);
};

const scenicScore = (i: number, j: number, data: number[][]) => {
  return sliceLTRB(i, j, data)
    .map((slice) => [slice, slice.findIndex((tree) => tree >= data[i][j])])
    // @ts-ignore
    .map(([slice, findex]) => findex === -1 ? slice.length : findex + 1)
    .reduce((a, b) => a * b);
};

// @ts-ignore
const traverse = (data: number[][], fn) => {
  for (let i = 1; i < data.length - 1; ++i) {
    for (let j = 1; j < data[i].length - 1; ++j) {
      fn(i, j);
    }
  }
};

const getVisibleCount = (data: number[][]) => {
  let visible = data.length * 2 + (data[0].length - 2) * 2;
  traverse(data, (i: number, j: number) => {
    visible += Number(isVisible(i, j, data));
  });
  return visible;
};

const getBestScenicScore = (data: number[][]) => {
  let best = 0;
  traverse(data, (i: number, j: number) => {
    best = Math.max(scenicScore(i, j, data), best);
  });
  return best;
};
