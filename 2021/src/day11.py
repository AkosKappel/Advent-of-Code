import itertools as it
import numpy as np


def part1(filename: str):
    octopuses = parse(filename)

    height, width = octopuses.shape
    n_steps = 100
    n_flashes = 0

    # print(octopuses)
    for n in range(n_steps):
        for pos_y, pos_x in it.product(range(height), range(width)):
            n_flashes, octopuses = increment_energy_level(pos_y, pos_x, height, width, octopuses, n_flashes)
        octopuses[octopuses > 9] = 0

    # print(octopuses)
    return n_flashes


def part2(filename: str):
    octopuses = parse(filename)

    height, width = octopuses.shape
    all_flash = None

    n = 1
    while not all_flash:
        for pos_y, pos_x in it.product(range(height), range(width)):
            n_flashes, octopuses = increment_energy_level(pos_y, pos_x, height, width, octopuses, 0)
        if np.all(octopuses > 9):
            all_flash = n
            # print(octopuses)
        octopuses[octopuses > 9] = 0
        n += 1

    return all_flash


def parse(filename: str):
    with open(filename, mode='r') as f:
        return np.array([[int(num) for num in row.strip()] for row in f.readlines()])


def increment_energy_level(y, x, height, width, octopuses, n_flashes):
    octopuses[y, x] += 1
    if octopuses[y, x] == 10:
        n_flashes += 1
        neighbors = [
            (y + i, x + j)
            for i in range(-1, 2)
            for j in range(-1, 2) if
            (i, j) != (0, 0) and
            -1 < y + i < height and
            -1 < x + j < width
        ]
        for neighbor_y, neighbor_x in neighbors:
            n_flashes, octopuses = increment_energy_level(neighbor_y, neighbor_x, height, width, octopuses, n_flashes)

    return n_flashes, octopuses


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
