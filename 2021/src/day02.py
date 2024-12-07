def part1(filename: str):
    inputs = parse(filename)

    x, y = 0, 0

    for i in range(0, len(inputs), 2):
        direction, distance = inputs[i], int(inputs[i + 1])
        if direction == 'forward':
            x += distance
        elif direction == 'down':
            y += distance
        elif direction == 'up':
            y -= distance

    # print(f'{x = }, {y = }, {x * y = }')
    return x * y


def part2(filename: str):
    inputs = parse(filename)

    x, y, aim = 0, 0, 0

    for i in range(0, len(inputs), 2):
        command, units = inputs[i], int(inputs[i + 1])
        if command == 'forward':
            x += units
            y += aim * units
        elif command == 'down':
            aim += units
        elif command == 'up':
            aim -= units

    # print(f'{x = }, {y = }, {x * y = }')
    return x * y


def parse(filename: str):
    with open(filename, mode='r') as f:
        return f.read().split()


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
