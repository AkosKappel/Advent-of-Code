import itertools as it
import numpy as np

with open('input.txt', 'r') as f:
    octopuses = np.array([[int(num) for num in row.strip()] for row in f.readlines()])

height, width = octopuses.shape
n_steps = 100
n_flashes = 0


def increment_energy_level(y, x):
    global octopuses, n_flashes
    octopuses[y, x] += 1
    if octopuses[y, x] == 10:
        n_flashes += 1
        neighbors = [(y + i, x + j) for i in range(-1, 2) for j in range(-1, 2) if
                     (i, j) != (0, 0) and -1 < y + i < height and -1 < x + j < width]
        for neighbor_y, neighbor_x in neighbors:
            increment_energy_level(neighbor_y, neighbor_x)


print(octopuses)

for n in range(n_steps):
    for pos_y, pos_x in it.product(range(height), range(width)):
        increment_energy_level(pos_y, pos_x)
    octopuses[octopuses > 9] = 0

print(octopuses)
print(f'{n_flashes=}')
