package aoc;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

public class Day05 {
    private static int[] parse(String input) {
        return Arrays.stream(input.trim().split(","))
                .mapToInt(Integer::parseInt)
                .toArray();
    }

    private static int read(int param, int mode, int[] program) {
        return switch (mode) {
            case 0 -> program[param]; // position mode
            case 1 -> param; // immediate mode
            default -> throw new IllegalArgumentException();
        };
    }

    private static List<Integer> run(int[] program, int input) {
        List<Integer> output = new LinkedList<>();

        int ip = 0;
        while (ip < program.length) {
            int opcode = program[ip] % 100;
            int paramModes = program[ip] / 100;
            if (opcode == 99) break;

            int param1 = program[(ip + 1) % program.length];
            int param2 = program[(ip + 2) % program.length];
            int param3 = program[(ip + 3) % program.length];

            int mode1 = paramModes % 10;
            int mode2 = (paramModes / 10) % 10;
            int mode3 = (paramModes / 100) % 10;

            switch (opcode) {
                case 1:
                    program[param3] = read(param1, mode1, program) + read(param2, mode2, program);
                    ip += 4;
                    break;
                case 2:
                    program[param3] = read(param1, mode1, program) * read(param2, mode2, program);
                    ip += 4;
                    break;
                case 3:
                    program[program[ip + 1]] = input;
                    ip += 2;
                    break;
                case 4:
                    output.add(read(param1, mode1, program));
                    ip += 2;
                    break;
                case 5:
                    ip = read(param1, mode1, program) != 0 ? read(param2, mode2, program) : ip + 3;
                    break;
                case 6:
                    ip = read(param1, mode1, program) == 0 ? read(param2, mode2, program) : ip + 3;
                    break;
                case 7:
                    program[param3] = read(param1, mode1, program) < read(param2, mode2, program) ? 1 : 0;
                    ip += 4;
                    break;
                case 8:
                    program[param3] = read(param1, mode1, program) == read(param2, mode2, program) ? 1 : 0;
                    ip += 4;
                    break;
            }
        }

        return output;
    }

    public long part1(String input) {
        int[] program = parse(input);
        List<Integer> output = run(program, 1);
        return output.get(output.size() - 1);
    }

    public long part2(String input) {
        int[] program = parse(input);
        List<Integer> output = run(program, 5);
        return output.get(output.size() - 1);
    }

    public static void main(String[] args) throws Exception {
        Day05 day = new Day05();
        String filepath = "src/main/resources/day05.txt";
        String input = Files.readString(Paths.get(filepath), StandardCharsets.UTF_8);

        long startPart1 = System.currentTimeMillis();
        long resultPart1 = day.part1(input);
        long endPart1 = System.currentTimeMillis();
        System.out.println("Part 1: " + resultPart1 + " (" + (endPart1 - startPart1) + " ms)");

        long startPart2 = System.currentTimeMillis();
        long resultPart2 = day.part2(input);
        long endPart2 = System.currentTimeMillis();
        System.out.println("Part 2: " + resultPart2 + " (" + (endPart2 - startPart2) + " ms)");
    }
}