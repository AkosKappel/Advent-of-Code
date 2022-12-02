from collections import defaultdict


with open('input.txt', 'r') as f:
    inputs = [int(n) for n in f.read().split(',')]


n_days = 256
population = defaultdict(int)
for k in inputs:
    population[k] += 1


for _ in range(n_days):
    new_population = defaultdict(int)
    for k in population.keys():
        if k > 0:
            new_population[k - 1] += population[k]
        else:
            new_population[6] += population[k]
            new_population[8] += population[k]
    population = new_population

print(sum(population.values()))
