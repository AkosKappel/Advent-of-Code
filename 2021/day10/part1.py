from collections import deque

with open('input.txt', 'r') as f:
    inputs = f.read().split('\n')

# global variables:
round_brackets = ('(', ')')
square_brackets = ('[', ']')
curly_brackets = ('{', '}')
angle_brackets = ('<', '>')


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

print(f'{error_score=}')
