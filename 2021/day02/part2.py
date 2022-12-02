with open('input.txt', 'r') as f:
    inputs = f.read().split()

x, y, aim = 0, 0, 0

for i in range(0, len(inputs), 2):
    command, units = inputs[i], int(inputs[i + 1])
    if command == 'forward':
        x += units
        y += aim * units
    elif command == 'down':
        aim += units
    elif command == 'up':
        aim -= units

print(f'{x=}, {y=}, {x*y=}')
