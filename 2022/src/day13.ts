const customParse = (s: string): any[] => {
  const root: any[] = [];
  let head: any[] = root;
  const digit = /\d/;

  let i = 0;
  while (i < s.length) {
    const char = s[i];

    switch (char) {
      case '[': // start new nested list
        head.push([]);
        head = head[head.length - 1];
        break;
      case ']': // go back to parent list
        const tmp = head;
        head = root;
        while (head[head.length - 1] !== tmp) head = head[head.length - 1];
        break;
      case char.match(digit) ? char : '': // add number to current list
        let j = i;
        while (j < s.length && s[j].match(digit)) j++;
        head.push(+s.substring(i, j));
        i = j - 1;
        break;
    }
    i++;
  }

  return root.pop();
};

const parse = (s: string, custom: boolean = false): any[][] => s.trim()
  .split('\n\n')
  .map((block: string) => block.split('\n')
    .map(packet => custom ? customParse(packet) : JSON.parse(packet)));

const compare = (left: any, right: any): number => {
  // both are numbers
  if ([left, right].every(val => +val === val)) return left - right;

  // nest numbers in arrays
  [left, right] = [left, right].map(val => (+val === val ? [val] : val));

  // recursively compare nested arrays
  return left.reduce((acc: number, val: any, i: number) =>
    acc || compare(val, right[i] ?? val), 0) || left.length - right.length;
};

export const part1 = (s: string): number => parse(s)
  .map((g: any[], i: number): [any[], number] => [g, i])
  .filter(([[left, right]]) => compare(left, right) < 0)
  .map(([_, i]: [any[], number]) => i + 1)
  .reduce((acc: number, v: number) => acc + v, 0);

exports.first = part1;

export const part2 = (s: string): number => {
  const dividerPackets = [[[2]], [[6]]];
  return parse(s)
    .flat()
    .concat(dividerPackets)
    .sort(compare)
    .map((val, i) => [val, i])
    .filter(([val]) => dividerPackets.some(packet => packet === val))
    .map(([_, i]) => i + 1)
    .reduce((acc, v) => acc * v, 1);
};

exports.second = part2;
