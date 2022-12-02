from collections import Counter, defaultdict


with open('input.txt', 'r') as f:
    pairs = defaultdict(int)
    polymer = f.readline().strip()
    for i in range(len(polymer) - 1):
        pairs[polymer[i:i + 2]] += 1
    f.readline()
    rules = {}
    for rule in f.read().split('\n'):
        adjacent, inserted = rule.split(' -> ')
        rules[adjacent] = inserted

n_steps = 40
print(f'{polymer=}')
print(f'{pairs=}')
print(f'{rules=}')

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
    print(f'{n+1}: {pairs=}')


counter = defaultdict(int)
for p in pairs:
    counter[p[0]] += pairs[p]
counter[polymer[-1]] += 1

freq = Counter(counter).most_common()
most_common, least_common = freq[0], freq[-1]
answer = most_common[1] - least_common[1]

print(f'{freq=}')
print(f'{most_common=} {least_common=}')
print(f'{answer=}')
