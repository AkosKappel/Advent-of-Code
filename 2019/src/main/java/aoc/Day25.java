package aoc;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Day25 {
    private static long[] parse(String input) {
        String[] lines = input.replaceAll("\r\n", "\n").split("\n");
        return new long[lines.length];
    }
    public long part1(String input) {
        return 0L;
    }

    public long part2(String input) {
        return 0L;
    }

    public static void main(String[] args) throws Exception {
        Day25 day = new Day25();
        String filepath = "src/main/resources/day25.txt";
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