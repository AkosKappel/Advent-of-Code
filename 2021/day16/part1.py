version_sum = 0


def main():
    main_packet = load_packet('input.txt', 0)
    decode_packet(main_packet)
    print(f'{version_sum = }')


def decode_packet(p: str, start: int = 0) -> int:
    if all(bit == '0' for bit in p):
        return len(p)

    version = int(p[start:start + 3], 2)  # VVV
    type_id = int(p[start + 3:start + 6], 2)  # TTT (4 == literal value, !4 == operator)
    print(f'{p = } {version = } {type_id = }')

    global version_sum
    version_sum += version

    if type_id == 4:  # literal value
        n_groups = p[start + 6::5].index('0') + 1
        bin_literal_value = ''.join([p[start + 6 + i * 5:start + 6 + 5 + i * 5][1:] for i in range(n_groups)])
        dec_literal_value = int(bin_literal_value, 2)
        # print(f'{bin_literal_value = } {dec_literal_value = }')
        return 6 + n_groups * 5
    else:  # operator
        length_type_id = int(p[start + 6], 2)  # I

        if length_type_id == 0:
            n_subpackets_bits = int(p[start + 7:start + 7 + 15], 2)  # L * 15
            subpackets = p[start + 7 + 15:start + 7 + 15 + n_subpackets_bits]
            # print(f'{n_subpackets_bits = }')
            # print(f'{subpackets = }')

            idx = 0
            while idx < n_subpackets_bits:
                idx += decode_packet(subpackets, start=idx)
            return 7 + 15 + n_subpackets_bits
        elif length_type_id == 1:
            n_subpackets = int(p[start + 7:start + 7 + 11], 2)  # L * 11
            # print(f'{n_subpackets = }')

            idx = 0
            for _ in range(n_subpackets):
                idx += decode_packet(p[start + 7 + 11:], start=idx)
            return 7 + 11 + idx


def load_packet(fname: str, row_id: int = 0) -> str:
    with open(fname, 'r') as f:
        content = f.read().split('\n')[row_id]
    padding = len(content) * 4
    return bin(int(content, 16))[2:].zfill(padding)


if __name__ == '__main__':
    main()
