from collections import deque

# global variables:
round_brackets = ('(', ')')
square_brackets = ('[', ']')
curly_brackets = ('{', '}')
angle_brackets = ('<', '>')


def part1(filename: str):
    inputs = parse(filename)

    error_score = 0
    error_score_dict = {
        round_brackets[1]: 3,
        square_brackets[1]: 57,
        curly_brackets[1]: 1197,
        angle_brackets[1]: 25137,
    }

    opening_brackets = frozenset([round_brackets[0], square_brackets[0], curly_brackets[0], angle_brackets[0]])
    closing_brackets = frozenset([round_brackets[1], square_brackets[1], curly_brackets[1], angle_brackets[1]])

    for line in inputs:
        stack = deque()
        for char in line:
            if char in opening_brackets:
                stack.append(char)
                continue
            # work with only closing brackets
            closing_pair = char
            opening_pair = get_pair(closing_pair)
            if opening_pair != stack.pop():
                error_score += error_score_dict[closing_pair]
                break

    return error_score


def part2(filename: str):
    inputs = parse(filename)

    scores = []
    score_dict = {
        round_brackets[1]: 1,
        square_brackets[1]: 2,
        curly_brackets[1]: 3,
        angle_brackets[1]: 4,
    }

    opening_brackets = frozenset([round_brackets[0], square_brackets[0], curly_brackets[0], angle_brackets[0]])
    closing_brackets = frozenset([round_brackets[1], square_brackets[1], curly_brackets[1], angle_brackets[1]])

    for line in inputs:
        stack = deque()
        for char in line:
            if char in opening_brackets:
                stack.append(char)
                continue
            closing_pair = char
            opening_pair = get_pair(closing_pair)

            # discard corrupted lines
            if len(stack) == 0 or opening_pair != stack.pop():
                stack.clear()
                break

        # get score for completing incomplete lines
        score = 0
        while len(stack) > 0:
            opening_pair = stack.pop()
            closing_pair = get_pair(opening_pair)
            score *= 5
            score += score_dict[closing_pair]
        if score > 0:
            scores.append(score)

    # print(f'{scores = }')
    scores.sort()
    middle_score = scores[int(len(scores) / 2)]
    return middle_score


def get_pair(bracket):
    if bracket in round_brackets:
        return round_brackets[(round_brackets.index(bracket) + 1) % 2]
    elif bracket in square_brackets:
        return square_brackets[(square_brackets.index(bracket) + 1) % 2]
    elif bracket in curly_brackets:
        return curly_brackets[(curly_brackets.index(bracket) + 1) % 2]
    elif bracket in angle_brackets:
        return angle_brackets[(angle_brackets.index(bracket) + 1) % 2]
    return ''


def parse(filename: str):
    with open(filename, mode='r') as f:
        return f.read().split('\n')


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
