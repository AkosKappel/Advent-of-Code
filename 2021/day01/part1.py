with open('input.txt', 'r') as f:
    inputs = [int(num) for num in f.read().split()]

n_increases = 0

previous = inputs[0]
for i in range(1, len(inputs)):
    current = inputs[i]
    if current > previous:
        n_increases += 1
    previous = current

print(n_increases)
