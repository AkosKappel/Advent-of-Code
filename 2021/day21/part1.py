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


def main():
    pos1, pos2 = get_starting_positions('input.txt')

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

    print(f'{player1 = }')
    print(f'{player2 = }')
    print(f'{die = }')

    answer = loser.score * die.n_rolls
    print(f'{answer = }')


def get_starting_positions(filename):
    with open(filename, 'r') as f:
        lines = f.read().split('\n')
    return [int(line.split(' ')[-1]) for line in lines]


if __name__ == '__main__':
    main()
