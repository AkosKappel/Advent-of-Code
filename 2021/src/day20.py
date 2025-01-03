import itertools as it
import numpy as np


def part1(filename: str):
    kernel_size = 3
    instructions, image = parse(filename, kernel_size)

    # print_pretty_image(image)
    for _ in range(2):
        image = convolve(image, instructions, kernel_size)
        # print_pretty_image(image)

    n_lit_pixels = sum([sum(pixel == '1' for pixel in row) for row in image])
    return n_lit_pixels


def part2(filename: str):
    kernel_size = 3
    instructions, image = parse(filename, kernel_size)

    for _ in range(50):
        image = convolve(image, instructions, kernel_size)

    n_lit_pixels = sum([sum(pixel == '1' for pixel in row) for row in image])
    return n_lit_pixels


def convolve(image, instructions, kernel_size):
    convolved = image.copy()
    height, width = image.shape
    span = (kernel_size - 1) // 2
    for i, j in it.product(range(span, height - span), range(span, width - span)):
        image_piece = image[i - span: i + span + 1, j - span: j + span + 1]
        index_bin = ''.join([''.join(line) for line in image_piece])
        index_dec = int(index_bin, 2)
        pixel = instructions[index_dec]
        convolved[i, j] = pixel
    extend_value = convolved[span, span]  # same value as infinite space around image
    convolved[:span, :] = convolved[-span:, :] = convolved[:, :span] = convolved[:, -span:] = extend_value
    convolved = extend_image(convolved, kernel_size // 2, extend_value)
    return convolved


def print_pretty_image(img):
    print('\n'.join([''.join(['#' if char == '1' else '.' for char in row]) for row in img]) + '\n')


def extend_image(img, length, value):
    extended = np.full(shape=[dimension + 2 * length for dimension in img.shape], fill_value=value)
    extended[length: - length, length: - length] = img
    return extended


def parse(filename: str, kernel_size: int):
    with open(filename, mode='r') as f:
        instructions, grid = f.read().split('\n\n')
    instructions = instructions.replace('#', '1').replace('.', '0')
    pixels = np.array([['1' if char == '#' else '0' for char in row] for row in grid.split('\n')])
    image = extend_image(pixels, kernel_size, '0')
    return instructions, image


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
