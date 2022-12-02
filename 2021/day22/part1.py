import numpy as np
import re
from collections import namedtuple

Instruction = namedtuple('Instruction', ['state', 'x_min', 'x_max', 'y_min', 'y_max', 'z_min', 'z_max'])


def main():
    instructions = load_file('input.txt')
    size = 101
    cube = np.zeros((size, size, size), dtype=np.int8)

    offset = size // 2
    for instruction in instructions:
        x_min, x_max = instruction.x_min + offset, instruction.x_max + offset
        y_min, y_max = instruction.y_min + offset, instruction.y_max + offset
        z_min, z_max = instruction.z_min + offset, instruction.z_max + offset
        if any(c < 0 or c >= size for c in (x_min, x_max, y_min, y_max, z_min, z_max)):
            break
        cube[x_min:x_max + 1, y_min:y_max + 1, z_min:z_max + 1] = instruction.state

    print(f'{instructions = }')
    n_on = np.sum(cube)
    print(f'{n_on = }')


def load_file(fname: str) -> tuple:
    with open(fname, 'r') as f:
        lines = [line.split(' ') for line in f.read().split('\n')]
    return tuple(Instruction(int(state == 'on'), *map(int, re.findall(r'-?\d+', coords))) for state, coords in lines)


if __name__ == '__main__':
    main()
