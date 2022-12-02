import numpy as np
from collections import Counter


with open('input.txt', 'r') as f:
    inputs = np.array([[digit for digit in num] for num in f.read().split()])


o2_generator_rating = []
co2_scrubber_rating = []

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
print(o2_winner_candidate)
print(co2_winner_candidate)

o2_bin = ''.join(o2_winner_candidate)
co2_bin = ''.join(co2_winner_candidate)

o2_dec = int(o2_bin, 2)
co2_dec = int(co2_bin, 2)
life_support_rating = o2_dec * co2_dec

print(f'{o2_dec=}, {co2_dec=}, {life_support_rating=}')
