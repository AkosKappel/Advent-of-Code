from math import inf, floor, ceil

with open('input.txt', 'r') as f:
    inputs = sorted([int(n) for n in f.read().split(',')])

n_inputs = len(inputs)
mean = sum(inputs) / n_inputs
min_bound, max_bound = mean - 1 / 2, mean + 1 / 2

target_sum = inf
for k in range(floor(min_bound), ceil(max_bound) + 1):
    target_sum = min(sum(((x - k) ** 2 + abs(x - k)) / 2 for x in inputs), target_sum)
print(f'{target_sum=}')


# -------------------
# --- Brute force ---
# -------------------

# start, end = inputs[0], inputs[-1]
# target_sum = inf
#
# for n in range(start, end + 1):
#     temp_sum = 0
#     for pos in inputs:
#         distance = abs(n - pos)
#         temp_sum += distance * (distance + 1)
#     target_sum = min(temp_sum / 2, target_sum)
#
# print(f'{target_sum=}')
