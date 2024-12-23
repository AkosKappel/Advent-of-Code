import numpy as np
from collections import Counter


def part1(filename: str):
    inputs = parse(filename)

    gamma_rate = []
    epsilon_rate = []

    for col in inputs.T:
        frequency = Counter(col).most_common()
        most_common_bit, least_common_bit = frequency[0][0], frequency[-1][0]
        gamma_rate.append(most_common_bit)
        epsilon_rate.append(least_common_bit)

    gamma_rate_bin = ''.join(gamma_rate)
    epsilon_rate_bin = ''.join(epsilon_rate)

    gamma_rate_dec = int(gamma_rate_bin, 2)
    epsilon_rate_dec = int(epsilon_rate_bin, 2)
    power_consumption = gamma_rate_dec * epsilon_rate_dec

    # print(f'{gamma_rate_dec=}, {epsilon_rate_dec=}, {power_consumption=}')
    return power_consumption


def part2(filename: str):
    inputs = parse(filename)

    o2_candidates = [candidate for candidate in inputs]
    co2_candidates = [candidate for candidate in inputs]

    i = 0
    while len(o2_candidates) > 1 and i < inputs.shape[1]:
        col = np.array(o2_candidates).T[i]
        frequency = Counter(col).most_common()
        most_common_bit, most_common_freq = frequency[0]
        least_common_bit, least_common_freq = frequency[-1]
        if most_common_freq == least_common_freq:
            most_common_bit = '1'
            least_common_bit = '0'
        o2_candidates = [candidate for candidate in o2_candidates if candidate[i] == most_common_bit]
        i += 1

    i = 0
    while len(co2_candidates) > 1 and i < inputs.shape[1]:
        col = np.array(co2_candidates).T[i]
        frequency = Counter(col).most_common()
        most_common_bit, most_common_freq = frequency[0]
        least_common_bit, least_common_freq = frequency[-1]
        if most_common_freq == least_common_freq:
            most_common_bit = '1'
            least_common_bit = '0'
        co2_candidates = [candidate for candidate in co2_candidates if candidate[i] == least_common_bit]
        i += 1

    o2_winner_candidate = o2_candidates[0]
    co2_winner_candidate = co2_candidates[0]
    # print(o2_winner_candidate)
    # print(co2_winner_candidate)

    o2_bin = ''.join(o2_winner_candidate)
    co2_bin = ''.join(co2_winner_candidate)

    o2_dec = int(o2_bin, 2)
    co2_dec = int(co2_bin, 2)
    life_support_rating = o2_dec * co2_dec

    # print(f'{o2_dec=}, {co2_dec=}, {life_support_rating=}')
    return life_support_rating


def parse(filename: str):
    with open(filename, mode='r') as f:
        return np.array([[digit for digit in num] for num in f.read().split()])


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
