import numpy as np

version_sum = 0


def main():
    main_packet = load_packet('input.txt', 0)
    final_value, _ = decode_packet(main_packet)
    print(f'{version_sum = }')
    print(f'{final_value = }')


def decode_packet(p: str, start: int = 0) -> tuple[int, int]:
    value = -1
    if all(bit == '0' for bit in p):
        print('all zeros')
        return value, len(p)

    version = int(p[start:start + 3], 2)  # VVV
    type_id = int(p[start + 3:start + 6], 2)  # TTT (4 == literal value, !4 == operator)

    global version_sum
    version_sum += version

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


def load_packet(fname: str, row_id: int = 0) -> str:
    with open(fname, 'r') as f:
        content = f.read().split('\n')[row_id]
    padding = len(content) * 4
    return bin(int(content, 16))[2:].zfill(padding)


if __name__ == '__main__':
    main()
