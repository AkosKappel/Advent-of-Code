package aoc;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;

public class Day02 {

    private static int[] parse(String input) {
        return Arrays.stream(input.trim().split(","))
                .mapToInt(Integer::parseInt)
                .toArray();
    }

    private static void run(int[] program) {
        for (int i = 0; i < program.length; i += 4) {
            int opcode = program[i];
            if (opcode == 99) break;

            int in1 = program[i + 1];
            int in2 = program[i + 2];
            int out = program[i + 3];

            switch (opcode) {
                case 1:
                    program[out] = program[in1] + program[in2];
                    break;
                case 2:
                    program[out] = program[in1] * program[in2];
                    break;
            }
        }
    }

    public long part1(String input) {
        int[] program = parse(input);
        program[1] = 12;
        program[2] = 2;
        run(program);
        return program[0];
    }

    public long part2(String input) {
        final int target = 19690720;

        for (int noun = 0; noun < 100; noun++) {
            for (int verb = 0; verb < 100; verb++) {
                int[] program = parse(input);
                program[1] = noun;
                program[2] = verb;
                run(program);
                if (program[0] == target) {
                    return 100 * noun + verb;
                }
            }
        }

        throw new IllegalStateException("No solution found");
    }

    public static void main(String[] args) throws Exception {
        Day02 day = new Day02();
        String filepath = "src/main/resources/day02.txt";
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