def part1(filename: str):
    inputs = parse(filename)

    n_increases = 0

    previous = inputs[0]
    for i in range(1, len(inputs)):
        current = inputs[i]
        if current > previous:
            n_increases += 1
        previous = current

    return n_increases


def part2(filename: str):
    inputs = parse(filename)

    n_increases = 0
    window_size = 3

    previous_window = inputs[0:window_size]
    for i in range(1, len(inputs) - window_size + 1):
        current_window = inputs[i:i + window_size]
        if sum(current_window) > sum(previous_window):
            n_increases += 1
        previous_window = current_window

    return n_increases


def parse(filename: str):
    with open(filename, mode='r') as f:
        return [int(num) for num in f.read().split()]


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
