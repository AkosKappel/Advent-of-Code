from functools import cache
from itertools import product


def move(pos: int, steps: int) -> int:
    return (pos + steps - 1) % 10 + 1


QUANTUM_ROLLS = tuple(map(sum, product((1, 2, 3), repeat=3)))


@cache
def play_dirac(pos1: int, pos2: int, pts1: int, pts2: int) -> tuple[int, int]:
    # Because of the player switching (see below) the last updated player is
    # always player 2. So only player 2 (more precisely: the player who is
    # currently taking the role of player 2) can win.
    if pts2 >= 21:
        return 0, 1

    # At each turn the universe splits into 3 * 3 * 3 = 27 universes
    wins1 = wins2 = 0
    for throws in QUANTUM_ROLLS:
        # Move
        pos = move(pos1, throws)
        pts = pts1 + pos
        # Recurse to play the next round. Switch the roles of player 1 and
        # player 2 so that it's the turn of player 2 next.
        w2, w1 = play_dirac(pos2, pos, pts2, pts)
        wins1 += w1
        wins2 += w2

    return wins1, wins2


def run():
    with open('../data/day21_example.txt', 'r') as f:
        lines = f.read().split('\n')
    start = [int(line.split(' ')[-1]) for line in lines]
    wins = play_dirac(*start, 0, 0)
    part2 = max(wins)
    return part2


print(f'{run()}')
