import numpy as np
import itertools as it

with open('input.txt', 'r') as f:
    heightmap = np.array([[int(n) for n in row] for row in f.read().split('\n')])

height, width = heightmap.shape
risk_level = 0

# inside of grid
for i, j in it.product(range(1, height - 1), range(1, width - 1)):
    val = heightmap[i, j]
    if val < heightmap[i-1, j] and val < heightmap[i+1, j] and val < heightmap[i, j-1] and val < heightmap[i, j+1]:
        risk_level += val + 1

# grid borders
for i in range(1, height - 1):
    # left
    val = heightmap[i, 0]
    if val < heightmap[i-1, 0] and val < heightmap[i+1, 0] and val < heightmap[i, 1]:
        risk_level += val + 1
    # right
    val = heightmap[i, width-1]
    if val < heightmap[i-1, width-1] and val < heightmap[i+1, width-1] and val < heightmap[i, width-2]:
        risk_level += val + 1

for j in range(1, width - 1):
    # top
    val = heightmap[0, j]
    if val < heightmap[1, j] and val < heightmap[0, j-1] and val < heightmap[0, j+1]:
        risk_level += val + 1
    # bottom
    val = heightmap[height-1, j]
    if val < heightmap[height-2, j] and val < heightmap[height-1, j-1] and val < heightmap[height-1, j+1]:
        risk_level += val + 1

# grid corners
val = heightmap[0, 0]
if val < heightmap[1, 0] and val < heightmap[0, 1]:
    risk_level += val + 1

val = heightmap[0, width-1]
if val < heightmap[1, width-1] and val < heightmap[0, width-2]:
    risk_level += val + 1

val = heightmap[height-1, 0]
if val < heightmap[height-2, 0] and val < heightmap[height-1, 1]:
    risk_level += val + 1

val = heightmap[height-1, width-1]
if val < heightmap[height-2, width-1] and val < heightmap[height-1, width-2]:
    risk_level += val + 1

print(f'{heightmap}')
print(f'{risk_level=}')

