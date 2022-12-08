import { input, answer1, answer2 } from '../examples/day08.input';

const parse = (s: string) => s.trim()
  .split('\n',
  ).map(row => row.split(''));

export const part1 = (s: string) => {
  const trees = parse(s);
  let n = 0;

  for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees[i].length; j++) {
      const tree = trees[i][j];
      // look up
      let tallest = true;
      for (let k = i - 1; k >= 0; k--) {
        if (trees[k][j] >= tree) {
          tallest = false;
          break;
        }
      }
      if (tallest) {
        n++;
        continue;
      }
      // look down
      tallest = true;
      for (let k = i + 1; k < trees.length; k++) {
        if (trees[k][j] >= tree) {
          tallest = false;
          break;
        }
      }
      if (tallest) {
        n++;
        continue;
      }
      // look left
      tallest = true;
      for (let k = j - 1; k >= 0; k--) {
        if (trees[i][k] >= tree) {
          tallest = false;
          break;
        }
      }
      if (tallest) {
        n++;
        continue;
      }
      // look right
      tallest = true;
      for (let k = j + 1; k < trees[i].length; k++) {
        if (trees[i][k] >= tree) {
          tallest = false;
          break;
        }
      }
      if (tallest) {
        n++;
      }
    }
  }

  return n;
};
console.log(part1(input));
console.log(answer1);

exports.first = part1;

export const part2 = (s: string) => {
  const trees = parse(s);
  let bestScenicScore = 0;

  for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees[i].length; j++) {

      const tree = trees[i][j];
      let scenicScore = 1;

      // look up
      let tallest = true;
      for (let k = i - 1; k >= 0; k--) {
        if (trees[k][j] >= tree) {
          tallest = false;
          // console.log('up', i, j, k, trees[k][j], tree, 'i - k', i - k);
          scenicScore *= (i - k);
          break;
        }
      }
      if (tallest) {
        // console.log('up', i, j, 'i', i);
        scenicScore *= (i);
      }
      // look down
      tallest = true;
      for (let k = i + 1; k < trees.length; k++) {
        if (trees[k][j] >= tree) {
          tallest = false;
          // console.log('down', i, j, k, trees[k][j], tree, 'k - i', k - i);
          scenicScore *= (k - i);
          break;
        }
      }
      if (tallest) {
        // console.log('down', i, j, 'trees.length - i', trees.length - i - 1);
        scenicScore *= (trees.length - i - 1);
      }
      // look left
      tallest = true;
      for (let k = j - 1; k >= 0; k--) {
        if (trees[i][k] >= tree) {
          tallest = false;
          // console.log('left', i, j, k, trees[i][k], tree, 'j - k', j - k);
          scenicScore *= (j - k);
          break;
        }
      }
      if (tallest) {
        // console.log('left', i, j, 'j', j);
        scenicScore *= (j);
      }
      // look right
      tallest = true;
      for (let k = j + 1; k < trees[i].length; k++) {
        if (trees[i][k] >= tree) {
          tallest = false;
          // console.log('right', i, j, k, trees[i][k], tree, 'k - j', k - j);
          scenicScore *= (k - j);
          break;
        }
      }
      if (tallest) {
        // console.log('right', i, j, 'trees[i].length - j - 1', trees[i].length - j - 1);
        scenicScore *= (trees[i].length - j - 1);
      }

      bestScenicScore = Math.max(bestScenicScore, scenicScore);
    }
  }

  return bestScenicScore;
};
console.log(part2(input));
console.log(answer2);

exports.second = part2;
