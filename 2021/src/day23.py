# TODO: implement
def part1(filename: str):
    inputs = parse(filename)

    return 0


def part2(filename: str):
    inputs = parse(filename)

    return 0


def parse(filename: str):
    with open(filename, mode='r') as f:
        return f.read().split('\n')


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
