from math import inf
from functools import lru_cache

ROOM_DISTANCE = (
    (2, 1, 1, 3, 5, 7, 8),
    (4, 3, 1, 1, 3, 5, 6),
    (6, 5, 3, 1, 1, 3, 4),
    (8, 7, 5, 3, 1, 1, 2),
)


def part1(filename: str):
    rooms = parse(filename)
    hallway = (None,) * 7
    min_cost = solve(rooms, hallway)
    return min_cost


def part2(filename: str):
    rooms = parse(filename)
    hallway = (None,) * 7

    new_objects = [(3, 3), (2, 1), (1, 0), (0, 2)]
    new_rooms = []

    for room, new in zip(rooms, new_objects):
        new_rooms.append((room[0], *new, room[-1]))

    rooms = tuple(new_rooms)
    min_cost = solve(rooms, hallway, len(rooms[0]))

    return min_cost


def parse(filename: str):
    with open(filename, mode='r') as f:
        next(f)
        next(f)
        rooms = []

        for _ in range(2):
            l = next(f)
            rooms.append(map('ABCD'.index, (l[3], l[5], l[7], l[9])))

        return tuple(zip(*rooms))


def move_cost(room, hallway, r, h, room_size, to_room: bool = False):
    if r + 1 < h:
        start = r + 2
        end = h + (not to_room)
    else:
        start = h + to_room
        end = r + 2

    if any(x is not None for x in hallway[start:end]):
        return inf

    obj = hallway[h] if to_room else room[0]

    return 10 ** obj * (ROOM_DISTANCE[r][h] + (to_room + room_size - len(room)))


def moves_to_room(rooms, hallway, room_size):
    for h, obj in enumerate(hallway):
        if obj is None:
            continue

        room = rooms[obj]
        if any(o != obj for o in room):
            continue

        cost = move_cost(room, hallway, obj, h, room_size, to_room=True)
        if cost == inf:
            continue

        new_rooms = rooms[:obj] + ((obj,) + room,) + rooms[obj + 1:]
        new_hallway = hallway[:h] + (None,) + hallway[h + 1:]
        yield cost, (new_rooms, new_hallway)


def moves_to_hallway(rooms, hallway, room_size):
    for r, room in enumerate(rooms):
        if all(o == r for o in room):
            continue

        for h in range(len(hallway)):
            cost = move_cost(room, hallway, r, h, room_size)
            if cost == inf:
                continue

            new_rooms = rooms[:r] + (room[1:],) + rooms[r + 1:]
            new_hallway = hallway[:h] + (room[0],) + hallway[h + 1:]
            yield cost, (new_rooms, new_hallway)


def possible_moves(rooms, hallway, room_size):
    try:
        yield next(moves_to_room(rooms, hallway, room_size))
    except StopIteration:
        yield from moves_to_hallway(rooms, hallway, room_size)


def done(rooms, room_size):
    for r, room in enumerate(rooms):
        if len(room) != room_size or any(obj != r for obj in room):
            return False
    return True


@lru_cache(maxsize=None)
def solve(rooms, hallway, room_size: int = 2):
    if done(rooms, room_size):
        return 0

    best = inf

    for cost, next_state in possible_moves(rooms, hallway, room_size):
        cost += solve(*next_state, room_size)

        if cost < best:
            best = cost

    return best


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
