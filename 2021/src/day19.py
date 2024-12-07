import numpy as np


def part1(filename: str):
    unknown_scanners = parse(filename)
    rotations = get_rotations()

    found_beacons = {tuple(b) for b in unknown_scanners.pop(0)}
    scanner_locations = [np.array([0, 0, 0])]

    while len(unknown_scanners) > 0:
        scanner = unknown_scanners.pop(0)
        joined = False
        for rotation in rotations:
            rotated_scanner = np.array([np.matmul(rotation, p) for p in scanner])
            for p1 in found_beacons:
                for p2 in rotated_scanner:
                    translation = p1 - p2
                    translated_scanner = rotated_scanner + translation
                    overlapped = np.array([tuple(p) in found_beacons for p in translated_scanner])
                    if sum(overlapped) < 12:
                        continue
                    overlaps, new_beacons = translated_scanner[overlapped], translated_scanner[~overlapped]
                    scanner_locations.append(translation)
                    for beacon in new_beacons:
                        found_beacons.add(tuple(beacon))
                    joined = True
                    break  # p2 loop
                if joined:
                    break  # p1 loop
            if joined:
                break  # rotation loop
        if not joined:
            unknown_scanners.append(scanner)

    n_beacons = len(found_beacons)
    # for location in scanner_locations:
    #     print(location)

    return n_beacons


def part2(filename: str):  # WARNING: slow implementation
    unknown_scanners = parse(filename)
    rotations = get_rotations()

    found_beacons = {tuple(b) for b in unknown_scanners.pop(0)}
    scanner_locations = [np.array([0, 0, 0])]

    while len(unknown_scanners) > 0:
        scanner = unknown_scanners.pop(0)
        joined = False
        for rotation in rotations:
            rotated_scanner = np.array([np.matmul(rotation, p) for p in scanner])
            for p1 in found_beacons:
                for p2 in rotated_scanner:
                    translation = p1 - p2
                    translated_scanner = rotated_scanner + translation
                    overlapped = np.array([tuple(p) in found_beacons for p in translated_scanner])
                    if sum(overlapped) < 12:
                        continue
                    overlaps, new_beacons = translated_scanner[overlapped], translated_scanner[~overlapped]
                    scanner_locations.append(translation)
                    for beacon in new_beacons:
                        found_beacons.add(tuple(beacon))
                    joined = True
                    break  # p2 loop
                if joined:
                    break  # p1 loop
            if joined:
                break  # rotation loop
        if not joined:
            unknown_scanners.append(scanner)

    max_distance = 0
    for i in range(len(scanner_locations)):
        for j in range(i + 1, len(scanner_locations)):
            dist = manhattan_distance(scanner_locations[i], scanner_locations[j])
            if max_distance < dist:
                max_distance = dist

    return max_distance


def parse(filename: str) -> list[np.ndarray]:
    with open(filename, mode='r') as f:
        scanners = f.read().split('\n\n')
    return [
        np.array([
            [int(coord) for coord in beacon.split(',')] for j, beacon in enumerate(scanner.split('\n')) if j != 0
        ], dtype=int) for scanner in scanners
    ]


def manhattan_distance(point1, point2):
    return sum(abs(c1 - c2) for c1, c2 in zip(point1, point2))


def get_rotations() -> list[np.ndarray]:
    identity = np.array([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
    ])
    rotation_x_90 = np.array([
        [1, 0, 0],
        [0, 0, -1],
        [0, 1, 0],
    ])
    rotation_y_90 = np.array([
        [0, 0, 1],
        [0, 1, 0],
        [-1, 0, 0],
    ])
    rotation_z_90 = np.array([
        [0, -1, 0],
        [1, 0, 0],
        [0, 0, 1],
    ])
    rotation_x_180 = np.matmul(rotation_x_90, rotation_x_90)
    rotation_x_270 = np.matmul(rotation_x_90, rotation_x_180)
    rotation_y_180 = np.matmul(rotation_y_90, rotation_y_90)
    rotation_y_270 = np.matmul(rotation_y_90, rotation_y_180)
    rotation_z_180 = np.matmul(rotation_z_90, rotation_z_90)
    rotation_z_270 = np.matmul(rotation_z_90, rotation_z_180)
    rotations = [
        # +z
        identity,
        rotation_z_90,
        rotation_z_180,
        rotation_z_270,
        # +x
        rotation_y_90,
        np.matmul(rotation_x_90, rotation_y_90),
        np.matmul(rotation_x_180, rotation_y_90),
        np.matmul(rotation_x_270, rotation_y_90),
        # -z
        rotation_y_180,
        np.matmul(rotation_z_90, rotation_y_180),
        np.matmul(rotation_z_180, rotation_y_180),
        np.matmul(rotation_z_270, rotation_y_180),
        # -x
        rotation_y_270,
        np.matmul(rotation_x_90, rotation_y_270),
        np.matmul(rotation_x_180, rotation_y_270),
        np.matmul(rotation_x_270, rotation_y_270),
        # +y
        rotation_x_90,
        np.matmul(rotation_y_90, rotation_x_90),
        np.matmul(rotation_y_180, rotation_x_90),
        np.matmul(rotation_y_270, rotation_x_90),
        # -y
        rotation_x_270,
        np.matmul(rotation_y_90, rotation_x_270),
        np.matmul(rotation_y_180, rotation_x_270),
        np.matmul(rotation_y_270, rotation_x_270),
    ]
    return rotations


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}_example.txt'
    print(part1(input_file))
    print(part2(input_file))
