import re


def main():
    x_min, x_max, y_min, y_max = load_file('input.txt')
    print(f'{x_min, x_max, y_min, y_max = }')

    assert y_max < 0, 'This solution works only for targets below starting point (0, 0)'

    vel_y = abs(y_min + 1)
    max_height = vel_y * (vel_y + 1) / 2
    print(f'{vel_y = }')
    print(f'{max_height = }')


def load_file(name):
    with open(name, 'r') as f:
        coords = [int(n) for n in re.findall(r'-?\d+', f.read())]
    return coords


if __name__ == '__main__':
    main()
