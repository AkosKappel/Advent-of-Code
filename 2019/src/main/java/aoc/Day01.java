package aoc;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Day01 {
    private long[] parse(String input) {
        String[] lines = input.replaceAll("\r\n", "\n").split("\n");
        long[] result = new long[lines.length];

        for (int i = 0; i < lines.length; i++) {
            result[i] = Long.parseLong(lines[i]);
        }

        return result;
    }

    private long calculateFuel(long mass) {
        return mass / 3 - 2;
    }

    public long part1(String input) {
        long total = 0;

        for (long mass : parse(input)) {
            total += calculateFuel(mass);
        }

        return total;
    }

    public long part2(String input) {
        long total = 0;

        for (long mass : parse(input)) {
            long fuel = calculateFuel(mass);
            while (fuel > 0) {
                total += fuel;
                fuel = calculateFuel(fuel);
            }
        }

        return total;
    }

    public static void main(String[] args) throws Exception {
        Day01 day = new Day01();
        String filepath = "src/main/resources/day01.txt";
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