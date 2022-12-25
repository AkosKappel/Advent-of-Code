// Special Numeral-Analogue Fuel Units
const SNAFU_DIGITS: { [digit: string]: number } = {
  '=': -2,
  '-': -1,
  '0': 0,
  '1': 1,
  '2': 2,
};

const parse = (s: string) => s.trim().split('\n');

const snafu_to_base10 = (num: string): number => {
  let power = Math.pow(5, num.length - 1);
  let result = 0;

  for (const digit of num) {
    result += SNAFU_DIGITS[digit] * power;
    power /= 5;
  }

  return result;
};

const divMod = (a: number, b: number): [number, number] => [Math.floor(a / b), a % b];

const base10_to_snafu = (num: number): string => {
  let result = '';

  let digit;
  while (num) {
    [num, digit] = divMod(num, 5);
    result += '012=-'[digit];
    num += +(digit > 2);
  }

  return result.split('').reverse().join('');
};

export const part1 = (s: string): number =>
  parse(s).reduce((acc: number, num: string) => acc + snafu_to_base10(num), 0);

exports.first = part1;

export const part2 = (s: string): string => base10_to_snafu(
  parse(s).reduce((acc: number, num: string) => acc + snafu_to_base10(num), 0));

exports.second = part2;
