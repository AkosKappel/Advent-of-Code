import * as console from 'console';

const parse = (s: string): Record<string, string[]> => s.trim()
  .split('\n')
  .map(line => line.split(': '))
  .reduce((monkeys: Record<string, string[]>, [name, action]: string[]) => {
    monkeys[name] = action.split(' ');
    return monkeys;
  }, {} as Record<string, string[]>);

const evaluateExpression = (number1: number, operator: string, number2: number): number => {
  switch (operator) {
    case '+':
      return number1 + number2;
    case '-':
      return number1 - number2;
    case '*':
      return number1 * number2;
    case '/':
      return number1 / number2;
    case '=':
      return +(number1 === number2);
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
};

const computeNumber = (monkey: string, monkeys: Record<string, string[]>): number => {
  const action: string[] = monkeys[monkey];
  if (action.length === 1) {
    return +action;
  }

  const [monkey1, oper, monkey2]: string[] = action;
  const num1: number = computeNumber(monkey1, monkeys);
  const num2: number = computeNumber(monkey2, monkeys);

  return evaluateExpression(num1, oper, num2);
};

export const part1 = (s: string): number => computeNumber('root', parse(s));

exports.first = part1;

const branchIncludes = (target: string, root: string, tree: Record<string, string[]>): boolean => {
  if (root === target) return true;

  const action: string[] = tree[root];
  if (action.length === 1) return false; // leaf

  const [left, , right]: string[] = action;
  return branchIncludes(target, left, tree) || branchIncludes(target, right, tree);
};

// NOTE: alternative solution: create linear equation from tree with 'humn' as unknown
//       and invert the operations in the equation to get the value of 'humn'
export const part2 = (s: string): number => {
  const monkeys: Record<string, string[]> = parse(s);
  const [ROOT, HUMN]: string[] = ['root', 'humn'];

  // update input constraints
  monkeys[ROOT] = monkeys[ROOT].map((v: string) => v.replace(/[-+*/]/, '='));
  monkeys[HUMN] = ['0'];

  // divide root into left and right branches
  const [leftMonkey, , rightMonkey]: string[] = monkeys[ROOT];
  const leftNum: number = computeNumber(leftMonkey, monkeys);
  const rightNum: number = computeNumber(rightMonkey, monkeys);

  // check and remember which branch contains 'humn'
  const leftIncludesHumn: boolean = branchIncludes(HUMN, leftMonkey, monkeys);
  const monkey: string = leftIncludesHumn ? leftMonkey : rightMonkey;
  let changingNum: number = leftIncludesHumn ? leftNum : rightNum;
  const constantNum: number = leftIncludesHumn ? rightNum : leftNum;

  // use binary search to find the value of 'humn'
  let low: number = 0; // assumption: the answer is >= 0
  let high: number = 1;

  // Direct Proportion: increasing the 'humn' value will increase the changingNum
  // Inverse Proportion: increasing the 'humn' value will decrease the changingNum
  let directProportion: boolean = changingNum < constantNum;

  // first find the upper bound
  while (directProportion ? changingNum < constantNum : changingNum > constantNum) {
    high *= 2;
    monkeys[HUMN] = [high.toString()];
    changingNum = computeNumber(monkey, monkeys);
  }

  // switch proportion, because now we will be reducing the [low, high] range
  directProportion = changingNum > constantNum;

  // binary search
  while (low < high) {
    const mid: number = low + Math.floor((high - low) / 2);
    monkeys[HUMN] = [mid.toString()];
    changingNum = computeNumber(monkey, monkeys);

    if (directProportion) {
      if (changingNum < constantNum) {
        low = mid;
      } else if (changingNum > constantNum) {
        high = mid;
      } else {
        return mid;
      }
    } else {
      if (changingNum < constantNum) {
        high = mid;
      } else if (changingNum > constantNum) {
        low = mid;
      } else {
        return mid;
      }
    }
  }

  return -1; // answer not found
};

exports.second = part2;
