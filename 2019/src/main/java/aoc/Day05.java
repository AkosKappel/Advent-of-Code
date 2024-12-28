package aoc;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Day05 {
    public long part1(String input) {
        IntcodeComputer program = IntcodeComputer.fromString(input);
        program.setOutputSize(-1); // let it run until it halts
        program.addInput(1);
        program.run();
        return program.readLastOutput();
    }

    public long part2(String input) {
        IntcodeComputer program = IntcodeComputer.fromString(input);
        program.addInput(5);
        program.run();
        return program.readOutput();
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