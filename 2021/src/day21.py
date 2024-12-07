from functools import lru_cache
from itertools import product

QUANTUM_ROLLS = tuple(map(sum, product((1, 2, 3), repeat=3)))


def part1(filename: str):
    pos1, pos2 = parse(filename)

    player1 = Player(position=pos1)
    player2 = Player(position=pos2)
    die = Die(start_value=1, max_value=100)
    target_score = 1000

    while True:
        player1.update_position(die.roll())
        if player1.score >= target_score:
            winner, loser = player1, player2
            break
        player2.update_position(die.roll())
        if player2.score >= target_score:
            winner, loser = player2, player1
            break

    # print(f'{player1 = }')
    # print(f'{player2 = }')
    # print(f'{die = }')

    return loser.score * die.n_rolls


def part2(filename: str):
    p1_pos, p2_pos = parse(filename)
    p1_wins, p2_wins = play(p1_pos, 0, p2_pos, 0, 21)
    # print(f'{p1_wins = }, {p2_wins = }')
    return max(p1_wins, p2_wins)


def parse(filename: str):
    with open(filename, mode='r') as f:
        lines = f.read().split('\n')
    return [int(line.split(' ')[-1]) for line in lines]


class Player:

    def __init__(self, position: int, max_position: int = 10):
        self.position = position
        self.max_position = max_position
        self.score = 0

    def __repr__(self):
        return f'Player(position={self.position}, score={self.score})'

    def __str__(self):
        return f'Player(position={self.position}, max_position={self.max_position}, score={self.score})'

    def update_position(self, num):
        self.position += num
        while self.position > self.max_position:
            self.position -= self.max_position
        self.score += self.position


class Die:

    def __init__(self, start_value: int = 1, max_value: int = 100):
        self.value = start_value
        self.max_value = max_value
        self.n_rolls = 0

    def __repr__(self):
        return f'Die(value={self.value}, n_rolls={self.n_rolls})'

    def __str__(self):
        return f'Die(value={self.value}, max_value={self.max_value}, n_rolls={self.n_rolls})'

    def roll(self, n_times: int = 3) -> int:
        total = 0
        for _ in range(n_times):
            total += self.value
            self.value += 1
            if self.value > self.max_value:
                self.value -= self.max_value
            self.n_rolls += 1
        return total


@lru_cache(maxsize=None)
def play(my_pos, my_score, other_pos, other_score, target_score):
    if my_score >= target_score:
        return 1, 0

    if other_score >= target_score:
        return 0, 1

    my_wins = other_wins = 0

    for roll in QUANTUM_ROLLS:
        # Play one turn calculating the new score with the current roll:
        new_pos = (my_pos + roll - 1) % 10 + 1
        new_score = my_score + new_pos

        # Let the other player play, swapping the arguments:
        ow, mw = play(other_pos, other_score, new_pos, new_score, target_score)

        # Update total wins of each player:
        my_wins += mw
        other_wins += ow

    return my_wins, other_wins


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
