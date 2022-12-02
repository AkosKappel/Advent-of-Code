import numpy as np
import itertools as it

with open('input.txt', 'r') as f:
    heightmap = np.array([[int(n) for n in row] for row in f.read().split('\n')])


def get_low_points(grid):
    height, width = grid.shape
    result = []

    # inside of grid
    for i, j in it.product(range(1, height - 1), range(1, width - 1)):
        val = grid[i, j]
        if val < grid[i - 1, j] and val < grid[i + 1, j] and val < grid[i, j - 1] and val < grid[i, j + 1]:
            result.append((i, j))

    # grid borders
    for i in range(1, height - 1):
        # left
        val = grid[i, 0]
        if val < grid[i - 1, 0] and val < grid[i + 1, 0] and val < grid[i, 1]:
            result.append((i, 0))
        # right
        val = grid[i, width - 1]
        if val < grid[i - 1, width - 1] and val < grid[i + 1, width - 1] and val < grid[i, width - 2]:
            result.append((i, width - 1))

    for j in range(1, width - 1):
        # top
        val = grid[0, j]
        if val < grid[1, j] and val < grid[0, j - 1] and val < grid[0, j + 1]:
            result.append((0, j))
        # bottom
        val = grid[height - 1, j]
        if val < grid[height - 2, j] and val < grid[height - 1, j - 1] and val < grid[height - 1, j + 1]:
            result.append((height - 1, j))

    # grid corners
    val = grid[0, 0]
    if val < grid[1, 0] and val < grid[0, 1]:
        result.append((0, 0))

    val = grid[0, width - 1]
    if val < grid[1, width - 1] and val < grid[0, width - 2]:
        result.append((0, width - 1))

    val = grid[height - 1, 0]
    if val < grid[height - 2, 0] and val < grid[height - 1, 1]:
        result.append((height - 1, 0))

    val = grid[height - 1, width - 1]
    if val < grid[height - 2, width - 1] and val < grid[height - 1, width - 2]:
        result.append((height - 1, width - 1))

    return result


def get_basin_size(pos_y, pos_x, grid):
    height, width = grid.shape
    if pos_y < 0 or pos_y > height - 1 or pos_x < 0 or pos_x > width - 1:  # outside of grid
        return 0
    if grid[pos_y, pos_x] == -1:  # visited
        return 0
    if grid[pos_y, pos_x] >= 9:  # not a basin
        return 0
    size = 0
    grid[pos_y, pos_x] = -1
    for i in (-1, 1,):
        size += get_basin_size(pos_y + i, pos_x, grid)
        size += get_basin_size(pos_y, pos_x + i, grid)
    return size + 1


low_points = get_low_points(heightmap)

basin_sizes = []
for low_point in low_points:
    basin_size = get_basin_size(*low_point, heightmap)
    basin_sizes.append(basin_size)

basin_sizes.sort(reverse=True)
answer = np.prod(basin_sizes[:3])

print(f'{heightmap}')
print(f'{low_points=}')
print(f'{basin_sizes=}')
print(f'{answer=}')
