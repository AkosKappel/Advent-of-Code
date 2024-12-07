# TODO: implement
operations = {
    'inp': lambda a: a,
    'add': lambda a, b: a + b,
    'mul': lambda a, b: a * b,
    'div': lambda a, b: a // b,
    'mod': lambda a, b: a % b,
    'eql': lambda a, b: int(a == b),
}


def part1(filename: str):
    instructions = parse(filename)
    x = y = z = w = 0

    for ins in instructions:
        print(f'{operations[ins[0]](ins[1:])}')

    return 0


def part2(filename: str):
    inputs = parse(filename)

    return 0


def parse(filename: str) -> list[list[str]]:
    with open(filename, mode='r') as f:
        lines = f.read().split('\n')
    return [line.split(' ') for line in lines]


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
