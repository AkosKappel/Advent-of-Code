import numpy as np


def part1(filename: str):
    seafloor = parse(filename)
    # pretty_print(seafloor)
    answer = solve(seafloor)
    return answer


def solve(grid: np.ndarray) -> int:
    n_moves = 0
    while move('>', grid) + move('v', grid) > 0:
        n_moves += 1
        # print(n_moves)
        # pretty_print(grid)
    return n_moves + 1


def move(herd_type: str, grid: np.ndarray) -> int:
    # all objects that want to move
    to_move = grid == herd_type

    # landing positions
    grid_shifted_back = np.roll(grid, -1, 1 if herd_type == '>' else 0)

    # only objects that can move
    to_move[grid_shifted_back != '.'] = False

    # clear previous positions
    grid[to_move] = '.'

    # move objects
    to_move_shifted_forward = np.roll(to_move, 1, 1 if herd_type == '>' else 0)
    grid[to_move_shifted_forward] = herd_type

    return len(grid[to_move])


def pretty_print(grid: np.ndarray) -> None:
    print('\n'.join(''.join(char for char in row) for row in grid), '\n')


def parse(filename: str) -> np.ndarray:
    with open(filename, mode='r') as f:
        grid = np.array([[char for char in line] for line in f.read().split('\n')])
    return grid


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
