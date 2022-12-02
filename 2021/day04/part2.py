import numpy as np


with open('input.txt', 'r') as f:
    numbers = [int(num) for num in f.readline().strip().split(',')]
    inputs = [board.replace('\n', ' ') for board in f.read().strip().split('\n\n')]

boards = [np.fromstring(board, dtype=int, count=25, sep=' ').reshape((5, 5)) for board in inputs]
hit = -1
winner_line = [hit] * 5
loser_board = None
last_num = None


for num in numbers:
    winner_indices = []
    for i, board in enumerate(boards):
        board[board == num] = hit
        if (winner_line == board).all(axis=1).any() or (winner_line == board.T).all(axis=1).any():
            winner_indices.append(i)
    for index in reversed(winner_indices):
        boards.pop(index)
    if len(boards) == 1:
        loser_board = boards[0]
    elif len(boards) < 1:
        last_num = num
        break


winner_sum = loser_board.sum() + abs(hit) * (loser_board == hit).sum()
score = winner_sum * last_num
print(loser_board)
print(f'{winner_sum=}, {last_num=}, {score=}')
