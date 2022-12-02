
with open('input.txt', 'r') as f:
    inputs = [[len(segment) for segment in group.split(' ')] for group in f.read().replace(' | ', '\n').split('\n')]

signals = inputs[::2]
outputs = inputs[1::2]

# flatten 2D list
# inputs = [num for segment in inputs for num in segment]
outputs = [num for segment in outputs for num in segment]

n_unique = sum(num in (2, 3, 4, 7) for num in outputs)

print(f'{inputs=}')
print(f'{signals=}')
print(f'{outputs=}')
print(f'{n_unique=}')
