import numpy as np


def part1(filename: str):
    inputs = parse(filename)

    # filter for rows where x1 = x2 or y1 = y2
    inputs = np.array([row for row in inputs if row[0] == row[2] or row[1] == row[3]])

    n_rows = inputs.max(initial=0) + 1
    grid = np.zeros((n_rows, n_rows), dtype=int)

    for row in inputs:
        x1, y1, x2, y2 = row
        if x2 < x1:
            x1, x2 = x2, x1
        if y2 < y1:
            y1, y2 = y2, y1
        grid[y1:y2 + 1, x1:x2 + 1] += 1

    # print(grid)
    return (grid > 1).sum()


def part2(filename: str):
    inputs = parse(filename)

    # filter rows with horizontal, vertical or diagonal lines
    inputs = np.array([
        row for row in inputs if
        row[0] == row[2] or
        row[1] == row[3] or
        abs(row[0] - row[2]) == abs(row[1] - row[3])
    ])

    n_rows = inputs.max(initial=0) + 1
    grid = np.zeros((n_rows, n_rows), dtype=int)

    for row in inputs:
        x1, y1, x2, y2 = row
        if x1 == x2 or y1 == y2:
            if x2 < x1:
                x1, x2 = x2, x1
            if y2 < y1:
                y1, y2 = y2, y1
            grid[y1:y2 + 1, x1:x2 + 1] += 1
        else:
            if x1 < x2 and y1 < y2 or x2 < x1 and y2 < y1:
                if x2 < x1:
                    x1, x2 = x2, x1
                if y2 < y1:
                    y1, y2 = y2, y1
                for x, y in zip(range(x1, x2 + 1), range(y1, y2 + 1)):
                    grid[y, x] += 1
            else:
                if x2 < x1 and y2 > y1:
                    x1, y1, x2, y2 = x2, y2, x1, y1
                for x, y in zip(range(x1, x2 + 1), range(y1, y2 - 1, -1)):
                    grid[y, x] += 1

    # print(grid)
    return (grid > 1).sum()


def parse(filename: str):
    with open(filename, mode='r') as f:
        # [[x1, y1, x2, y2], ...]
        return np.array([
            [int(num) for num in line.replace(' -> ', ',').split(',')]
            for line in f.read().split('\n')
        ])


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
