import re
from collections import namedtuple

Target = namedtuple('Target', ['x_min', 'x_max', 'y_min', 'y_max'])


def main():
    x_min, x_max, y_min, y_max = load_file('input.txt')
    target = Target(x_min, x_max, y_min, y_max)
    print(f'{target = }')

    assert y_min < y_max < 0, 'This solution works only for targets below starting point (0, 0)'

    max_vel_y = abs(y_min + 1)  # higher vel_y will overshoot target
    max_vel_x = x_max

    velocities = []
    for vel_y in range(target.y_min, max_vel_y + 1):
        for vel_x in range(max_vel_x + 1):
            if hit((vel_x, vel_y), target):
                velocities.append((vel_x, vel_y))
    print(f'{len(velocities) = }')


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


def load_file(name):
    with open(name, 'r') as f:
        coords = [int(n) for n in re.findall(r'-?\d+', f.read())]
    return coords


if __name__ == '__main__':
    main()
