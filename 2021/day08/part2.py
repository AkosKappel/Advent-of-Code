
with open('input.txt', 'r') as f:
    inputs = [[group.split(' ') for group in row.split(' | ')] for row in f.read().split('\n')]


def get_decoder(segments: list) -> dict:
    digit_0 = None
    digit_1 = segments[0]
    digit_2 = None
    digit_3 = None
    digit_4 = segments[2]
    digit_5 = None
    digit_6 = None
    digit_7 = segments[1]
    digit_8 = segments[9]
    digit_9 = None

    group_235 = segments[3:6]
    group_069 = segments[6:9]

    for code in group_069:
        if not all([char in code for char in digit_1]):
            digit_6 = code
        if all([char in code for char in digit_4]):
            digit_9 = code
    for code in group_069:
        if code not in (digit_6, digit_9):
            digit_0 = code

    for code in group_235:
        if all([char in code for char in digit_1]):
            digit_3 = code
        if all([char in digit_6 for char in code]):
            digit_5 = code
    for code in group_235:
        if code not in (digit_3, digit_5):
            digit_2 = code

    return {
        digit_0: 0,
        digit_1: 1,
        digit_2: 2,
        digit_3: 3,
        digit_4: 4,
        digit_5: 5,
        digit_6: 6,
        digit_7: 7,
        digit_8: 8,
        digit_9: 9,
    }


def decode(segments: list, rules: dict):
    num = 0
    for segment in segments:
        digit = 0
        s = set(segment)
        for k, v in rules.items():
            if s == set(k):
                digit += v
        num *= 10
        num += digit
    return num


total = 0
for i in inputs:
    signal, output = i
    signal.sort(key=len)

    decoder = get_decoder(signal)
    number = decode(output, decoder)

    total += number

print(f'{total=}')
