import numpy as np
import re
from collections import namedtuple

Instruction = namedtuple('Instruction', ['state', 'x_min', 'x_max', 'y_min', 'y_max', 'z_min', 'z_max'])


def part1(filename: str):
    instructions = parse(filename)

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

    # print(f'{instructions = }')
    n_on = np.sum(cube)
    return n_on


def part2(filename: str):
    instructions = parse(filename)

    cuboids = []
    for ins in instructions:
        new_cuboid = Cuboid(ins.x_min, ins.x_max, ins.y_min, ins.y_max, ins.z_min, ins.z_max)
        for cuboid in cuboids:
            cuboid.subtract(new_cuboid)
        if ins.state == 1:
            cuboids.append(new_cuboid)

    return sum(cuboid.volume() for cuboid in cuboids)


def parse(filename: str):
    with open(filename, mode='r') as f:
        lines = [line.split(' ') for line in f.read().split('\n')]
    return tuple(Instruction(int(state == 'on'), *map(int, re.findall(r'-?\d+', coords))) for state, coords in lines)


class Cuboid:

    def __init__(self, x0, x1, y0, y1, z0, z1):
        self.x_min, self.x_max = x0, x1
        self.y_min, self.y_max = y0, y1
        self.z_min, self.z_max = z0, z1
        self.cutoffs = []

    def __repr__(self):
        return f'Cuboid(x_min={self.x_min}, x_max={self.x_max}, y_min={self.y_min}, y_max={self.y_max}, ' \
               f'z_min={self.z_min}, z_max={self.z_max}, n_cutoffs={len(self.cutoffs)})'

    def volume(self):
        return (self.x_max - self.x_min + 1) * (self.y_max - self.y_min + 1) * (self.z_max - self.z_min + 1) \
            - sum(cutoff.volume() for cutoff in self.cutoffs)

    def subtract(self, other):
        if self.does_intersect(other):
            x_overlap = get_overlap((self.x_min, self.x_max), (other.x_min, other.x_max))
            y_overlap = get_overlap((self.y_min, self.y_max), (other.y_min, other.y_max))
            z_overlap = get_overlap((self.z_min, self.z_max), (other.z_min, other.z_max))

            for cutoff in self.cutoffs:
                cutoff.subtract(other)

            cuboid = Cuboid(*x_overlap, *y_overlap, *z_overlap)
            self.cutoffs.append(cuboid)

    def does_intersect(self, other) -> bool:
        return does_overlap((self.x_min, self.x_max), (other.x_min, other.x_max)) and \
            does_overlap((self.y_min, self.y_max), (other.y_min, other.y_max)) and \
            does_overlap((self.z_min, self.z_max), (other.z_min, other.z_max))


def does_overlap(interval1: tuple, interval2: tuple) -> bool:
    start, end = max(interval1[0], interval2[0]), min(interval1[1], interval2[1])
    return start <= end


def get_overlap(interval1: tuple, interval2: tuple) -> tuple:
    start, end = max(interval1[0], interval2[0]), min(interval1[1], interval2[1])
    if start <= end:
        return start, end
    return None, None


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
