
with open('input.txt', 'r') as f:
    inputs = sorted([int(n) for n in f.read().split(',')])

n_inputs = len(inputs)

if n_inputs % 2 == 1:
    median = inputs[int(n_inputs / 2)]
else:
    median = int((inputs[int((n_inputs - 1) / 2)] + inputs[int((n_inputs + 1) / 2)]) / 2)

fuel_spent = sum([abs(median - n) for n in inputs])

print(f'{median=}, {fuel_spent=}')
