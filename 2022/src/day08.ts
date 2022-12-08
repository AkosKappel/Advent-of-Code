const parse = (s: string) => s.trim()
  .split('\n',
  ).map(row => row.split(''));

const DIR = {
  UP: [0, -1],
  DOWN: [0, 1],
  LEFT: [-1, 0],
  RIGHT: [1, 0],
};

const isTallest = (dir: number[], i: number, j: number, forest: string[][]): boolean => {
  const tree = forest[i][j];
  const [dx, dy] = dir;

  let [x, y] = [j + dx, i + dy];
  let tallest = true;

  while (forest[y] && forest[y][x]) {
    const nextTree = forest[y][x];

    if (nextTree >= tree) {
      tallest = false;
      break;
    }

    [x, y] = [x + dx, y + dy];
  }

  return tallest;
};

export const part1 = (s: string): number => {
  const trees = parse(s);
  let n = 0;

  for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees[i].length; j++) {
      if (isTallest(DIR.UP, i, j, trees) ||
        isTallest(DIR.DOWN, i, j, trees) ||
        isTallest(DIR.LEFT, i, j, trees) ||
        isTallest(DIR.RIGHT, i, j, trees)) {
        n++;
      }
    }
  }

  return n;
};

exports.first = part1;

const getDirScore = (dir: number[], i: number, j: number, forest: string[][]): number => {
  const tree = forest[i][j];
  const [dx, dy] = dir;

  let [x, y] = [j + dx, i + dy];
  let tallest = true;
  let scenicScore = 0;

  while (forest[y] && forest[y][x]) {
    const nextTree = forest[y][x];

    if (nextTree >= tree) {
      tallest = false;
      if (dir === DIR.UP) {
        scenicScore = i - y;
      } else if (dir === DIR.DOWN) {
        scenicScore = y - i;
      } else if (dir === DIR.LEFT) {
        scenicScore = j - x;
      } else if (dir === DIR.RIGHT) {
        scenicScore = x - j;
      }
      break;
    }

    [x, y] = [x + dx, y + dy];
  }

  if (tallest) {
    if (dir === DIR.UP) {
      scenicScore = i;
    } else if (dir === DIR.DOWN) {
      scenicScore = forest.length - i - 1;
    } else if (dir === DIR.LEFT) {
      scenicScore = j;
    } else if (dir === DIR.RIGHT) {
      scenicScore = forest[i].length - j - 1;
    }
  }

  return scenicScore;
};

export const part2 = (s: string): number => {
  const trees = parse(s);
  let bestScenicScore = 0;

  for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees[i].length; j++) {

      const scoreUp = getDirScore(DIR.UP, i, j, trees);
      const scoreDown = getDirScore(DIR.DOWN, i, j, trees);
      const scoreLeft = getDirScore(DIR.LEFT, i, j, trees);
      const scoreRight = getDirScore(DIR.RIGHT, i, j, trees);

      const scenicScore = scoreUp * scoreDown * scoreLeft * scoreRight;
      bestScenicScore = Math.max(bestScenicScore, scenicScore);
    }
  }

  return bestScenicScore;
};

exports.second = part2;
