import numpy as np


def part1(filename: str, row_id: int = 0):
    main_packet = parse(filename, row_id)
    _, version_sum = decode_packet_version(main_packet)
    return version_sum


def part2(filename: str, row_id: int = 0):
    main_packet = parse(filename, row_id)
    final_value, _ = decode_packet(main_packet)
    return final_value


def parse(filename: str, row_id: int):
    with open(filename, mode='r') as f:
        content = f.read().split('\n')[row_id]
    padding = len(content) * 4
    return bin(int(content, 16))[2:].zfill(padding)


def decode_packet_version(p: str, start: int = 0, version_sum: int = 0) -> (int, int):
    if all(bit == '0' for bit in p):
        return len(p), version_sum

    version = int(p[start:start + 3], 2)  # VVV
    type_id = int(p[start + 3:start + 6], 2)  # TTT (4 == literal value, !4 == operator)
    # print(f'{p = } {version = } {type_id = }')

    version_sum += version

    if type_id == 4:  # literal value
        n_groups = p[start + 6::5].index('0') + 1
        bin_literal_value = ''.join([p[start + 6 + i * 5:start + 6 + 5 + i * 5][1:] for i in range(n_groups)])
        dec_literal_value = int(bin_literal_value, 2)
        # print(f'{bin_literal_value = } {dec_literal_value = }')
        return 6 + n_groups * 5, version_sum
    else:  # operator
        length_type_id = int(p[start + 6], 2)  # I

        if length_type_id == 0:
            n_subpackets_bits = int(p[start + 7:start + 7 + 15], 2)  # L * 15
            subpackets = p[start + 7 + 15:start + 7 + 15 + n_subpackets_bits]
            # print(f'{n_subpackets_bits = }')
            # print(f'{subpackets = }')

            idx = 0
            while idx < n_subpackets_bits:
                new_idx, version_sum = decode_packet_version(subpackets, start=idx, version_sum=version_sum)
                idx += new_idx
            return 7 + 15 + n_subpackets_bits, version_sum
        elif length_type_id == 1:
            n_subpackets = int(p[start + 7:start + 7 + 11], 2)  # L * 11
            # print(f'{n_subpackets = }')

            idx = 0
            for _ in range(n_subpackets):
                new_idx, version_sum = decode_packet_version(p[start + 7 + 11:], start=idx, version_sum=version_sum)
                idx += new_idx
            return 7 + 11 + idx, version_sum


def decode_packet(p: str, start: int = 0) -> tuple[int, int]:
    value = -1
    if all(bit == '0' for bit in p):
        # print('all zeros')
        return value, len(p)

    version = int(p[start:start + 3], 2)  # VVV
    type_id = int(p[start + 3:start + 6], 2)  # TTT (4 == literal value, !4 == operator)

    if type_id == 4:  # literal value
        n_groups = p[start + 6::5].index('0') + 1
        bin_literal_value = ''.join([p[start + 6 + i * 5:start + 6 + 5 + i * 5][1:] for i in range(n_groups)])
        dec_literal_value = int(bin_literal_value, 2)
        return dec_literal_value, 6 + n_groups * 5
    else:  # operator
        length_type_id = int(p[start + 6], 2)  # I

        header_length = 7
        idx = 0
        nums = []
        if length_type_id == 0:
            header_length += 15
            n_subpackets_bits = int(p[start + 7:start + header_length], 2)  # L * 15
            subpackets = p[start + header_length:start + header_length + n_subpackets_bits]
            while idx < n_subpackets_bits:
                num, i = decode_packet(subpackets, start=idx)
                idx += i
                nums.append(num)
        elif length_type_id == 1:
            header_length += 11
            n_subpackets = int(p[start + 7:start + header_length], 2)  # L * 11
            for _ in range(n_subpackets):
                num, i = decode_packet(p[start + header_length:], start=idx)
                idx += i
                nums.append(num)

        if type_id == 0:
            value = int(sum(nums))
        elif type_id == 1:
            value = int(np.prod(nums, dtype=np.int64))
        elif type_id == 2:
            value = int(min(nums))
        elif type_id == 3:
            value = int(max(nums))
        elif type_id == 5:
            value = int(nums[0] > nums[1])
        elif type_id == 6:
            value = int(nums[0] < nums[1])
        elif type_id == 7:
            value = int(nums[0] == nums[1])

        return value, header_length + idx


if __name__ == '__main__':
    day_number = __file__[-5:-3]
    input_file = f'../data/day{day_number}.txt'
    print(part1(input_file))
    print(part2(input_file))
