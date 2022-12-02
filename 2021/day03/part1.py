import numpy as np
from collections import Counter


with open('input.txt', 'r') as f:
    inputs = np.array([[digit for digit in num] for num in f.read().split()])


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

print(f'{gamma_rate_dec=}, {epsilon_rate_dec=}, {power_consumption=}')
