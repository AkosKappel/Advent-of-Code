operations = {
    'inp': lambda a: a,
    'add': lambda a, b: a + b,
    'mul': lambda a, b: a * b,
    'div': lambda a, b: a // b,
    'mod': lambda a, b: a % b,
    'eql': lambda a, b: int(a == b),
}


def main():
    instructions = load_file('example1.txt')
    x = y = z = w = 0

    for ins in instructions:
        print(f'{operations[ins[0]](ins[1:])}')


def load_file(fname: str) -> list:
    with open(fname, 'r') as f:
        lines = f.read().split('\n')
    return [line.split(' ') for line in lines]


if __name__ == '__main__':
    main()
