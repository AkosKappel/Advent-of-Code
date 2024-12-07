import numpy as np
import itertools as it


def part1(filename: str):
    heightmap = parse(filename)

    height, width = heightmap.shape
    risk_level = 0

    # inside of grid
    for i, j in it.product(range(1, height - 1), range(1, width - 1)):
        val = heightmap[i, j]
        if val < heightmap[i - 1, j] and val < heightmap[i + 1, j] and val < heightmap[i, j - 1] and val < heightmap[
            i, j + 1]:
            risk_level += val + 1

    # grid borders
    for i in range(1, height - 1):
        # left
        val = heightmap[i, 0]
        if val < heightmap[i - 1, 0] and val < heightmap[i + 1, 0] and val < heightmap[i, 1]:
            risk_level += val + 1
        # right
        val = heightmap[i, width - 1]
        if val < heightmap[i - 1, width - 1] and val < heightmap[i + 1, width - 1] and val < heightmap[i, width - 2]:
            risk_level += val + 1

    for j in range(1, width - 1):
        # top
        val = heightmap[0, j]
        if val < heightmap[1, j] and val < heightmap[0, j - 1] and val < heightmap[0, j + 1]:
            risk_level += val + 1
        # bottom
        val = heightmap[height - 1, j]
        if val < heightmap[height - 2, j] and val < heightmap[height - 1, j - 1] and val < heightmap[height - 1, j + 1]:
            risk_level += val + 1

    # grid corners
    val = heightmap[0, 0]
    if val < heightmap[1, 0] and val < heightmap[0, 1]:
        risk_level += val + 1

    val = heightmap[0, width - 1]
    if val < heightmap[1, width - 1] and val < heightmap[0, width - 2]:
        risk_level += val + 1

    val = heightmap[height - 1, 0]
    if val < heightmap[height - 2, 0] and val < heightmap[height - 1, 1]:
        risk_level += val + 1

    val = heightmap[height - 1, width - 1]
    if val < heightmap[height - 2, width - 1] and val < heightmap[height - 1, width - 2]:
        risk_level += val + 1

    # print(f'{heightmap}')
    return risk_level


def part2(filename: str):
    heightmap = parse(filename)

    low_points = get_low_points(heightmap)

    basin_sizes = []
    for low_point in low_points:
        basin_size = get_basin_size(*low_point, heightmap)
        basin_sizes.append(basin_size)

    basin_sizes.sort(reverse=True)
    answer = np.prod(basin_sizes[:3])

    # print(f'{heightmap}')
    # print(f'{low_points = }')
    # print(f'{basin_sizes = }')
    return answer


def parse(filename: str):
    with open(filename, mode='r') as f:
        return np.array([[int(n) for n in row] for row in f.read().split('\n')])


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


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
