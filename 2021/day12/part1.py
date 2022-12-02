from collections import defaultdict


caves = defaultdict(list)
with open('input.txt', 'r') as f:
    for line in f.readlines():
        source, target = line.strip().split('-')
        caves[source].append(target)
        caves[target].append(source)


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
            print(f'{path=}')
        elif is_small_cave(adjacent_cave):
            if adjacent_cave not in path:
                n_paths += visit_cave(adjacent_cave, all_caves, start=start, end=end, path=path.copy())
        elif is_big_cave(adjacent_cave):
            n_paths += visit_cave(adjacent_cave, all_caves, start=start, end=end, path=path.copy())
    return n_paths


print(f'{caves=}')
path_count = visit_cave('start', caves)
print(f'{path_count=}')

