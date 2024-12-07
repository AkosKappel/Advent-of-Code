from collections import Counter, defaultdict


def part1(filename: str):
    polymer, rules, _ = parse(filename)

    n_steps = 10
    # print(f'{polymer=}')
    # print(f'{rules=}')

    for n in range(n_steps):
        new_polymer = polymer[0]
        for i in range(1, len(polymer)):
            pair = polymer[i - 1:i + 1]
            if pair in rules.keys():
                new_polymer += rules[pair]
            new_polymer += pair[1]
        polymer = new_polymer
        # print(f'{n + 1}: {polymer=}')

    freq = Counter(polymer).most_common()
    most_common, least_common = freq[0], freq[-1]
    answer = most_common[1] - least_common[1]

    # print(f'{most_common=} {least_common=}')
    return answer


def part2(filename: str):
    polymer, rules, pairs = parse(filename)

    n_steps = 40
    # print(f'{polymer=}')
    # print(f'{pairs=}')
    # print(f'{rules=}')

    for n in range(n_steps):
        new_pairs = defaultdict(int)
        for pair in pairs:
            if pair in rules:
                left_part, right_part = pair[0] + rules[pair], rules[pair] + pair[1]
                new_pairs[left_part] += pairs[pair]
                new_pairs[right_part] += pairs[pair]
            else:
                new_pairs[pair] = pairs[pair]
        pairs = new_pairs
        # print(f'{n + 1}: {pairs=}')

    counter = defaultdict(int)
    for p in pairs:
        counter[p[0]] += pairs[p]
    counter[polymer[-1]] += 1

    freq = Counter(counter).most_common()
    most_common, least_common = freq[0], freq[-1]
    answer = most_common[1] - least_common[1]

    # print(f'{freq=}')
    # print(f'{most_common=} {least_common=}')
    return answer


def parse(filename: str):
    with open(filename, mode='r') as f:
        pairs = defaultdict(int)
        polymer = f.readline().strip()
        for i in range(len(polymer) - 1):
            pairs[polymer[i:i + 2]] += 1
        f.readline()

        rules = {}
        for rule in f.read().split('\n'):
            adjacent, inserted = rule.split(' -> ')
            rules[adjacent] = inserted

    return polymer, rules, pairs


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
