with open('input.txt', 'r') as f:
    inputs = [int(num) for num in f.read().split()]

n_increases = 0
window_size = 3

previous_window = inputs[0:window_size]
for i in range(1, len(inputs) - window_size + 1):
    current_window = inputs[i:i+window_size]
    if sum(current_window) > sum(previous_window):
        n_increases += 1
    previous_window = current_window

print(n_increases)
