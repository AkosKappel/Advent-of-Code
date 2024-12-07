from collections import deque
from functools import reduce


def part1(filename: str):
    constraints = parse(filename)
    n_max, _ = find_max_min(constraints)
    return n_max


def part2(filename: str):
    constraints = parse(filename)
    _, n_min = find_max_min(constraints)
    return n_min


def parse(filename: str):
    constraints = []
    stack = deque()

    def skip(file, n: int):
        for _ in range(n):
            next(file)

    with open(filename, mode='r') as f:
        for i in range(14):
            skip(f, 4)
            op = next(f).rstrip()
            assert op.startswith('div z '), 'Invalid input!'

            if op == 'div z 1':
                skip(f, 10)
                op = next(f)
                assert op.startswith('add y '), 'Invalid input!'

                a = int(op.split()[-1])
                stack.append((i, a))
                skip(f, 2)
            else:
                op = next(f)
                assert op.startswith('add x '), 'Invalid input!'

                b = int(op.split()[-1])
                j, a = stack.pop()
                constraints.append((i, j, a + b))
                skip(f, 12)

    return constraints


def find_max_min(constraints):
    n_max = [0] * 14
    n_min = [0] * 14

    for i, j, diff in constraints:
        if diff > 0:
            n_max[i], n_max[j] = 9, 9 - diff
            n_min[i], n_min[j] = 1 + diff, 1
        else:
            n_max[i], n_max[j] = 9 + diff, 9
            n_min[i], n_min[j] = 1, 1 - diff

    n_max = reduce(lambda acc, d: acc * 10 + d, n_max)
    n_min = reduce(lambda acc, d: acc * 10 + d, n_min)
    return n_max, n_min


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
