import numpy as np

with open('input.txt', 'r') as f:
    # [[x1, y1, x2, y2], ...]
    inputs = np.array([[int(num) for num in line.replace(' -> ', ',').split(',')] for line in f.read().split('\n')])

# filter for rows where x1 = x2 or y1 = y2
inputs = np.array([row for row in inputs if row[0] == row[2] or row[1] == row[3]])

n_rows = inputs.max(initial=0) + 1
grid = np.zeros((n_rows, n_rows), dtype=int)

for row in inputs:
    x1, y1, x2, y2 = row
    if x2 < x1:
        x1, x2 = x2, x1
    if y2 < y1:
        y1, y2 = y2, y1
    grid[y1:y2 + 1, x1:x2 + 1] += 1

print(grid)
print((grid > 1).sum())
