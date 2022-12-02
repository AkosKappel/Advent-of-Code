from collections import Counter


with open('input.txt', 'r') as f:
    polymer = f.readline().strip()
    f.readline()
    rules = {}
    for rule in f.read().split('\n'):
        adjacent, inserted = rule.split(' -> ')
        rules[adjacent] = inserted

n_steps = 10
print(f'{polymer=}')
print(f'{rules=}')

for n in range(n_steps):
    new_polymer = polymer[0]
    for i in range(1, len(polymer)):
        pair = polymer[i - 1:i + 1]
        if pair in rules.keys():
            new_polymer += rules[pair]
        new_polymer += pair[1]
    polymer = new_polymer
    print(f'{n+1}: {polymer=}')


freq = Counter(polymer).most_common()
most_common, least_common = freq[0], freq[-1]
answer = most_common[1] - least_common[1]

print(f'{most_common=} {least_common=}')
print(f'{answer=}')
