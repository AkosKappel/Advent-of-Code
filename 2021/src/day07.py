from math import inf, floor, ceil


def part1(filename: str):
    inputs = parse(filename)

    n_inputs = len(inputs)

    if n_inputs % 2 == 1:
        median = inputs[int(n_inputs / 2)]
    else:
        median = int((inputs[int((n_inputs - 1) / 2)] + inputs[int((n_inputs + 1) / 2)]) / 2)

    fuel_spent = sum([abs(median - n) for n in inputs])

    # print(f'{median=}, {fuel_spent=}')
    return fuel_spent


def part2(filename: str):
    inputs = parse(filename)

    n_inputs = len(inputs)
    mean = sum(inputs) / n_inputs
    min_bound, max_bound = mean - 1 / 2, mean + 1 / 2

    target_sum = inf
    for k in range(floor(min_bound), ceil(max_bound) + 1):
        target_sum = min(sum(((x - k) ** 2 + abs(x - k)) / 2 for x in inputs), target_sum)
    # print(f'{target_sum=}')

    # -------------------
    # --- Brute force ---
    # -------------------
    # start, end = inputs[0], inputs[-1]
    # target_sum = inf
    #
    # for n in range(start, end + 1):
    #     temp_sum = 0
    #     for pos in inputs:
    #         distance = abs(n - pos)
    #         temp_sum += distance * (distance + 1)
    #     target_sum = min(temp_sum / 2, target_sum)

    return target_sum


def parse(filename: str):
    with open(filename, mode='r') as f:
        return sorted([int(n) for n in f.read().split(',')])


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
