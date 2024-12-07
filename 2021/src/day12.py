from collections import defaultdict


def part1(filename: str):
    caves = parse(filename)
    # print(f'{caves = }')
    path_count = visit_cave('start', caves)
    return path_count


def part2(filename: str):
    caves = parse(filename)
    # print(f'{caves = }')
    path_count = visit_cave_twice('start', caves)
    return path_count


def parse(filename: str):
    caves = defaultdict(list)

    with open(filename, mode='r') as f:
        for line in f.readlines():
            source, target = line.strip().split('-')
            caves[source].append(target)
            caves[target].append(source)

    return caves


def is_small_cave(c: str) -> bool:
    return c == c.lower()


def is_big_cave(c: str) -> bool:
    return c == c.upper()


def visit_cave(cave: str, all_caves: dict, start: str = 'start', end: str = 'end', path=None) -> int:
    if path is None:
        path = []

    n_paths = 0
    path.append(cave)

    for adjacent_cave in all_caves[cave]:
        if adjacent_cave == start:
            pass
        elif adjacent_cave == end:
            n_paths += 1
            # print(f'{path=}')
        elif is_small_cave(adjacent_cave):
            if adjacent_cave not in path:
                n_paths += visit_cave(adjacent_cave, all_caves, start=start, end=end, path=path.copy())
        elif is_big_cave(adjacent_cave):
            n_paths += visit_cave(adjacent_cave, all_caves, start=start, end=end, path=path.copy())
    return n_paths


def visit_cave_twice(cave: str, all_caves: dict, start: str = 'start', end: str = 'end', path=None,
                     any_small_visited_twice: bool = False) -> int:
    if path is None:
        path = []

    n_paths = 0
    if is_small_cave(cave) and cave in path:
        any_small_visited_twice = True
    path.append(cave)

    # if not any_small_visited_twice:
    #     any_small_visited_twice = any(is_small_cave(c) and path.count(c) > 1 for c in all_caves.keys())

    for adjacent_cave in all_caves[cave]:
        if adjacent_cave == start:
            pass
        elif adjacent_cave == end:
            n_paths += 1
            # print(f'{path=}')
        elif is_small_cave(adjacent_cave):
            if not any_small_visited_twice or adjacent_cave not in path:
                n_paths += visit_cave_twice(adjacent_cave, all_caves, start=start, end=end, path=path.copy(),
                                            any_small_visited_twice=any_small_visited_twice)
        elif is_big_cave(adjacent_cave):
            n_paths += visit_cave_twice(adjacent_cave, all_caves, start=start, end=end, path=path.copy(),
                                        any_small_visited_twice=any_small_visited_twice)
    return n_paths


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
