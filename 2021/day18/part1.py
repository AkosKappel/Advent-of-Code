import json


def main():
    numbers = load_numbers('input.txt')
    print(f'{numbers = }')

    total = numbers[0]
    for num in numbers[1:]:
        total = add(total, num)
    print(f'{total = }')
    magnitude = get_magnitude(total)
    print(f'{magnitude = }')


def get_magnitude(n):
    if isinstance(n, int):
        return n
    left, right = n
    return 3 * get_magnitude(left) + 2 * get_magnitude(right)


def add(n1, n2):
    result = [n1, n2]
    return reduce(result)


def reduce(n):
    reduced = True
    while reduced:
        n, reduced, *_ = explode(n)
        if not reduced:
            n, reduced = split(n)
    return n


def explode(n, depth=0):
    if isinstance(n, int):
        return n, False, 0, 0
    left, right = n
    if depth > 3:
        return 0, True, left, right
    left, reduced, expr_left, expr_right = explode(left, depth + 1)
    if reduced:
        if expr_right != 0:
            right = add_to_next(right, expr_right)
            expr_right = 0
    else:
        right, reduced, expr_left, expr_right = explode(right, depth + 1)
        if reduced:
            if expr_left != 0:
                left = add_to_prev(left, expr_left)
                expr_left = 0
    return [left, right], reduced, expr_left, expr_right


def add_to_next(n, value):
    if isinstance(n, int):
        return n + value
    left, right = n
    return [add_to_next(left, value), right]


def add_to_prev(n, value):
    if isinstance(n, int):
        return n + value
    left, right = n
    return [left, add_to_prev(right, value)]


def split(n):
    if isinstance(n, int):
        if n > 9:
            left_num = n // 2  # floor(n / 2)
            right_num = n - left_num  # ceil(n / 2)
            return [left_num, right_num], True
        return n, False
    left, right = n
    left, reduced = split(left)
    if not reduced:
        right, reduced = split(right)
    return [left, right], reduced


def load_numbers(name: str) -> list:
    with open(name, 'r') as f:
        rows = f.read().split('\n')
    return [json.loads(row) for row in rows]


if __name__ == '__main__':
    main()
