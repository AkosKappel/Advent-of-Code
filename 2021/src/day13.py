import numpy as np


def part1(filename: str):
    coordinates, folds = parse(filename)

    width = 2 * max(int(n) for axis, n in folds if axis == 'x') + 1
    height = 2 * max(int(n) for axis, n in folds if axis == 'y') + 1
    paper = np.zeros(shape=(height, width), dtype=int)

    for x, y in coordinates:
        paper[y, x] = 1

    # print(f'{coordinates=}')
    # print(f'{folds=}')
    # print(f'{height=} {width=}')
    # print(f'{paper}')

    for fold in folds:
        axis, line = fold[0], int(fold[1])
        paper = fold_paper(paper, axis, line)
        break
    n_dots = (paper != 0).sum()

    return n_dots


def part2(filename: str):
    coordinates, folds = parse(filename)

    width = 2 * max(int(n) for axis, n in folds if axis == 'x') + 1
    height = 2 * max(int(n) for axis, n in folds if axis == 'y') + 1
    paper = np.zeros(shape=(height, width), dtype=int)

    for x, y in coordinates:
        paper[y, x] = 1

    # print(f'{coordinates=}')
    # print(f'{folds=}')
    # print(f'{height=} {width=}')
    # print(f'{paper}')

    for fold in folds:
        axis, line = fold[0], int(fold[1])
        paper = fold_paper(paper, axis, line)

    code = get_code(paper)
    return code


def parse(filename: str):
    with open(filename, mode='r') as f:
        lines = f.read().split('\n')
        section_split = lines.index('')
        coordinates, folds = lines[:section_split], lines[section_split + 1:]

    coordinates = [tuple(map(int, coord.split(','))) for coord in coordinates]
    folds = [tuple(fold.replace('fold along ', '').split('=')) for fold in folds]

    return coordinates, folds


def fold_paper(grid, axis, n):
    if axis == 'x':
        left_half, right_half = grid[:, :n], grid[:, n + 1:]
        left_half += np.fliplr(right_half)
        grid = left_half
    elif axis == 'y':
        upper_half, lower_half = grid[:n, :], grid[n + 1:, :]
        upper_half += np.flipud(lower_half)
        grid = upper_half
    return grid


def get_code(grid):
    return '\n'.join([''.join(['#' if n else '.' for n in row]) for row in grid])


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
