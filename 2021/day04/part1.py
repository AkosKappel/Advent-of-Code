import numpy as np


with open('input.txt', 'r') as f:
    numbers = [int(num) for num in f.readline().strip().split(',')]
    inputs = [board.replace('\n', ' ') for board in f.read().strip().split('\n\n')]

boards = [np.fromstring(board, dtype=int, count=25, sep=' ').reshape((5, 5)) for board in inputs]
hit = -1
winner_line = [hit] * 5
winner_board = None


for num in numbers:
    for board in boards:
        board[board == num] = hit
        if (winner_line == board).all(axis=1).any() or (winner_line == board.T).all(axis=1).any():
            winner_board = board
            break
    if winner_board is not None:
        winner_sum = winner_board.sum() + abs(hit) * (winner_board == hit).sum()
        score = winner_sum * num
        print(winner_board)
        print(f'{winner_sum=}, {num=}, {score=}')
        break
