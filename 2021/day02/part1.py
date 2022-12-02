with open('input.txt', 'r') as f:
    inputs = f.read().split()

x, y = 0, 0

for i in range(0, len(inputs), 2):
    direction, distance = inputs[i], int(inputs[i+1])
    if direction == 'forward':
        x += distance
    elif direction == 'down':
        y += distance
    elif direction == 'up':
        y -= distance

print(f'{x=}, {y=}, {x*y=}')
