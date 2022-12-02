import re
from math import ceil, floor


def main():
    rows = load_file('example1.txt')
    numbers = parse_numbers(rows)

    # row1, row2 = rows[:2]
    # num1, num2 = numbers[:2]
    # print(f'{row1 = }')
    # print(f'{row2 = }')
    # print(f'{num1 = }')
    # print(f'{num2 = }')

    num1 = parse_number('[[[0,7],4],[15,[0,13]]]')
    num2 = parse_number('[1,1]')

    s = add(num1, num2)
    pretty_print(s)
    print(f'{s = }')


def add(n1: dict, n2: dict) -> dict:
    total = reduce({'left': n1, 'right': n2})
    return total


def reduce(num: dict) -> dict:
    apply_action = True
    while apply_action:
        if explode(num):
            pretty_print(num)
            continue
        if split(num):
            pretty_print(num)
            continue
        apply_action = False
    return num


def explode(num: dict, depth: int = 0) -> bool:
    pass


def split(num: dict) -> bool:
    if isinstance(num['left'], int) and isinstance(num['right'], int):
        if num['left'] > 9:
            tmp = num['left'] / 2
            num['left'] = {'left': floor(tmp), 'right': ceil(tmp)}
            return True
        if num['right'] > 9:
            tmp = num['right'] / 2
            num['right'] = {'left': floor(tmp), 'right': ceil(tmp)}
            return True
        return False
    elif isinstance(num['left'], int):
        if num['left'] > 9:
            tmp = num['left'] / 2
            num['left'] = {'left': floor(tmp), 'right': ceil(tmp)}
            return True
        return split(num['right'])
    elif isinstance(num['right'], int):
        if split(num['left']):
            return True
        if num['right'] > 9:
            tmp = num['right'] / 2
            num['right'] = {'left': floor(tmp), 'right': ceil(tmp)}
            return True
        return False
    return split(num['left']) or split(num['right'])


def pretty_print(num: dict, root: bool = True):
    msg = num if isinstance(num, int) else f"[{pretty_print(num['left'], False)},{pretty_print(num['right'], False)}]"
    if root:
        print(msg)
    return msg


def parse_numbers(nums: list[str]) -> list[dict]:
    return [parse_number(n) for n in nums]


def parse_number(n: str) -> dict:
    left = right = None

    left_rule = re.compile(r'^\[(\d+),')
    match = left_rule.match(n)
    if match:
        left = match.group(1)
        right = left_rule.split(n)[-1][:-1]

    right_rule = re.compile(r',(\d+)]$')
    match = right_rule.search(n)
    if match:
        left = right_rule.split(n)[0][1:]
        right = match.group(1)

    if left is None or right is None:
        rule = re.compile(r'],\[')
        match = re.finditer(rule, n[1:-1])
        for m in match:
            left_candidate = n[1:m.start() + 1]
            right_candidate = n[m.end() + 1:-1]
            if left_candidate.count('[') == left_candidate.count(']') + 1 and \
                    right_candidate.count('[') + 1 == right_candidate.count(']'):
                left, right = left_candidate + ']', '[' + right_candidate

    assert left is not None and right is not None, f'cannot parse {n = }'

    return {
        'left': int(left) if left.isnumeric() else parse_number(left),
        'right': int(right) if right.isnumeric() else parse_number(right),
    }


def load_file(name: str) -> list:
    with open(name, 'r') as f:
        content = f.read().split('\n')
    return content


if __name__ == '__main__':
    main()
