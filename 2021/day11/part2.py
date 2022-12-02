import itertools as it
import numpy as np

with open('input.txt', 'r') as f:
    octopuses = np.array([[int(num) for num in row.strip()] for row in f.readlines()])

height, width = octopuses.shape
all_flash = None


def increment_energy_level(y, x):
    global octopuses
    octopuses[y, x] += 1
    if octopuses[y, x] == 10:
        neighbors = [(y + i, x + j) for i in range(-1, 2) for j in range(-1, 2) if
                     (i, j) != (0, 0) and -1 < y + i < height and -1 < x + j < width]
        for neighbor_y, neighbor_x in neighbors:
            increment_energy_level(neighbor_y, neighbor_x)


print(octopuses)

n = 1
while not all_flash:
    for pos_y, pos_x in it.product(range(height), range(width)):
        increment_energy_level(pos_y, pos_x)
    if np.all(octopuses > 9):
        all_flash = n
        print(octopuses)
    octopuses[octopuses > 9] = 0
    n += 1

print(f'{all_flash=}')
