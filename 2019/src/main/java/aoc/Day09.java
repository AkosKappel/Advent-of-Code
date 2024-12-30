package aoc;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Collectors;

public class Day09 {
    public String part1(String input) {
        IntcodeComputer computer = IntcodeComputer.fromString(input);
        computer.addInput(1);
        computer.run();
        return computer.getOutput().stream().map(String::valueOf).collect(Collectors.joining(","));
    }

    public long part2(String input) {
        IntcodeComputer computer = IntcodeComputer.fromString(input);
        computer.addInput(2);
        computer.run();
        return computer.readOutput();
    }

    public static void main(String[] args) throws Exception {
        Day09 day = new Day09();
        String filepath = "src/main/resources/day09.txt";
        String input = Files.readString(Paths.get(filepath), StandardCharsets.UTF_8);

        long startPart1 = System.currentTimeMillis();
        String resultPart1 = day.part1(input);
        long endPart1 = System.currentTimeMillis();
        System.out.println("Part 1: " + resultPart1 + " (" + (endPart1 - startPart1) + " ms)");

        long startPart2 = System.currentTimeMillis();
        long resultPart2 = day.part2(input);
        long endPart2 = System.currentTimeMillis();
        System.out.println("Part 2: " + resultPart2 + " (" + (endPart2 - startPart2) + " ms)");
    }
}