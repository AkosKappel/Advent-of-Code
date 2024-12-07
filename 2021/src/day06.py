from collections import defaultdict


def part1(filename: str):
    inputs = parse(filename)

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

    return len(population)


def part2(filename: str):
    inputs = parse(filename)

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

    return sum(population.values())


def parse(filename: str):
    with open(filename, mode='r') as f:
        return [int(n) for n in f.read().split(',')]


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
