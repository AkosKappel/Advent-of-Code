import numpy as np


def part1(filename: str):
    numbers, inputs = parse(filename)

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
            # print(winner_board)
            # print(f'{winner_sum=}, {num=}, {score=}')
            return score


def part2(filename: str):
    numbers, inputs = parse(filename)

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

    # print(loser_board)
    # print(f'{winner_sum=}, {last_num=}, {score=}')
    return score


def parse(filename: str):
    with open(filename, mode='r') as f:
        numbers = [int(num) for num in f.readline().strip().split(',')]
        inputs = [board.replace('\n', ' ') for board in f.read().strip().split('\n\n')]

    return numbers, inputs


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
