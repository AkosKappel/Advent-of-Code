import re
from collections import namedtuple


def part1(filename: str):
    x_min, x_max, y_min, y_max = parse(filename)
    # print(f'{x_min, x_max, y_min, y_max = }')

    assert y_max < 0, 'This solution works only for targets below starting point (0, 0)'

    vel_y = abs(y_min + 1)
    max_height = vel_y * (vel_y + 1) / 2
    # print(f'{vel_y = }')

    return max_height


def part2(filename: str):
    x_min, x_max, y_min, y_max = parse(filename)
    target = Target(x_min, x_max, y_min, y_max)
    # print(f'{target = }')

    assert y_min < y_max < 0, 'This solution works only for targets below starting point (0, 0)'

    max_vel_y = abs(y_min + 1)  # higher vel_y will overshoot target
    max_vel_x = x_max

    velocities = []
    for vel_y in range(target.y_min, max_vel_y + 1):
        for vel_x in range(max_vel_x + 1):
            if hit((vel_x, vel_y), target):
                velocities.append((vel_x, vel_y))

    return len(velocities)


def parse(filename: str):
    with open(filename, mode='r') as f:
        return [int(n) for n in re.findall(r'-?\d+', f.read())]


Target = namedtuple('Target', ['x_min', 'x_max', 'y_min', 'y_max'])


def hit(velocity: tuple, target: Target) -> bool:
    for position in trajectory(velocity, target):
        pos_x, pos_y = position
        if target.x_min <= pos_x <= target.x_max and target.y_min <= pos_y <= target.y_max:
            return True
    return False


def trajectory(velocity: tuple, target: Target) -> tuple:
    pos_x, pos_y = 0, 0
    vel_x, vel_y = velocity
    while pos_x <= target.x_max and pos_y >= target.y_min:
        yield pos_x, pos_y

        pos_x += vel_x
        pos_y += vel_y

        vel_x = max(0, vel_x - 1)
        vel_y = vel_y - 1


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
