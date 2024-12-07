import itertools as it
import numpy as np


class MinHeap:

    def __init__(self):
        self.items = []
        self.size = 0

    def __repr__(self):
        return f'MinHeap({self.items}, {self.size})'

    def is_empty(self) -> bool:
        return self.size == 0

    def show(self):
        print(f'{self.items}\n')

    def clear(self):
        while self.size > 0:
            self.remove()

    def insert(self, item):
        self.items.append(item)
        self.size += 1
        self.heapify_up()

    def remove(self):
        if self.size == 0:
            return None
        item = self.items[0]
        last_item = self.items.pop()
        if item is not last_item:
            self.items[0] = last_item
        self.size -= 1
        self.heapify_down()
        return item

    def update(self, key: tuple, value: int) -> bool:
        for i in range(self.size):
            if key == self.items[i][1]:
                self.items[i] = (value, key)
                self.heapify(i)
                return True
        return False

    def heapify_up(self):
        i = self.size - 1
        parent_i = (i - 1) // 2
        while parent_i >= 0 and self.items[parent_i] > self.items[i]:
            self.items[parent_i], self.items[i] = self.items[i], self.items[parent_i]
            i = parent_i
            parent_i = (i - 1) // 2

    def heapify_down(self):
        i = 0
        smaller_child_i = 2 * i + 1
        while self.size > smaller_child_i:
            if 2 * i + 2 < self.size and self.items[2 * i + 2] < self.items[smaller_child_i]:
                smaller_child_i += 1
            if self.items[i] < self.items[smaller_child_i]:
                break
            self.items[i], self.items[smaller_child_i] = self.items[smaller_child_i], self.items[i]
            i = smaller_child_i
            smaller_child_i = 2 * i + 1

    def heapify(self, i: int):
        parent_i = (i - 1) // 2
        while parent_i >= 0 and self.items[parent_i] > self.items[i]:
            self.items[parent_i], self.items[i] = self.items[i], self.items[parent_i]
            i = parent_i
            parent_i = (i - 1) // 2


def part1(filename: str):
    grid = parse(filename)

    h, w = grid.shape
    source = (0, 0)
    target = (h - 1, w - 1)

    dist, prev = dijkstra(grid, source, target)
    # print(f'{grid}')

    lowest_risk = dist[target]
    return lowest_risk


def part2(filename: str):  # WARNING: slow implementation
    grid = parse(filename)
    grid = enlarge_grid(grid)

    h, w = grid.shape
    source = (0, 0)
    target = (h - 1, w - 1)

    dist, prev = dijkstra(grid, source, target)
    # print(f'{grid}')

    lowest_risk = dist[target]
    return lowest_risk


def parse(filename: str):
    with open(filename, mode='r') as f:
        return np.array([[num for num in line] for line in f.read().split('\n')], dtype=int)


def dijkstra(graph: np.ndarray, source: tuple, target: tuple) -> (dict, dict):
    distance = {}
    previous = {}
    priority_queue = MinHeap()

    for key in it.product(*map(range, graph.shape)):
        distance[key] = np.inf
        previous[key] = None
        priority_queue.insert((np.inf if key != source else 0, key))
    distance[source] = 0

    while not priority_queue.is_empty():
        dist, node = priority_queue.remove()
        if node == target:
            priority_queue.clear()
            break
        for neighbor in neighbors(node):
            if not (-1 < neighbor[0] < graph.shape[0] and -1 < neighbor[1] < graph.shape[1]):
                continue
            key = tuple(neighbor)
            dist = distance[node] + graph[neighbor[0], neighbor[1]]
            if dist < distance[key]:
                distance[key] = dist
                previous[key] = node
                priority_queue.update(key, dist)
    return distance, previous


def neighbors(node):
    return np.array([
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ]) + node


def enlarge_grid(grid, factor: int = 5):
    new_grid = np.tile(grid, (factor, factor))
    height, width = grid.shape
    for i in range(factor):
        for j in range(factor):
            new_grid[i * height: (i + 1) * height, j * width: (j + 1) * width] += i + j - 1
            new_grid[i * height: (i + 1) * height, j * width: (j + 1) * width] %= 9
            new_grid[i * height: (i + 1) * height, j * width: (j + 1) * width] += 1
    return new_grid


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
