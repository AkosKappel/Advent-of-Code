from functools import lru_cache
from itertools import product

QUANTUM_ROLLS = tuple(map(sum, product((1, 2, 3), repeat=3)))


def main():
    p1_pos, p2_pos = get_starting_positions('input.txt')
    p1_wins, p2_wins = play(p1_pos, 0, p2_pos, 0, 21)
    print(f'{p1_wins = }')
    print(f'{p2_wins = }')


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


def get_starting_positions(filename):
    with open(filename, 'r') as f:
        lines = f.read().split('\n')
    return [int(line.split(' ')[-1]) for line in lines]


if __name__ == '__main__':
    main()
