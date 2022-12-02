
with open('input.txt', 'r') as f:
    inputs = [int(n) for n in f.read().split(',')]

population = inputs
n_days = 80

for _ in range(n_days):
    newborn = []
    for i, val in enumerate(population):
        if val == 0:
            population[i] = 6
            newborn.append(8)
        else:
            population[i] -= 1
    population.extend(newborn)

print(len(population))
