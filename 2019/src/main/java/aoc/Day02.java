package aoc;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Day02 {
    public long part1(String input) {
        IntcodeComputer program = IntcodeComputer.fromString(input);
        program.setMemoryAt(1, 12);
        program.setMemoryAt(2, 2);
        program.run();
        return program.getMemoryAt(0);
    }

    public long part2(String input) {
        final int target = 19690720;

        for (int noun = 0; noun < 100; noun++) {
            for (int verb = 0; verb < 100; verb++) {
                IntcodeComputer program = IntcodeComputer.fromString(input);
                program.setMemoryAt(1, noun);
                program.setMemoryAt(2, verb);
                program.run();
                if (program.getMemoryAt(0) == target) {
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