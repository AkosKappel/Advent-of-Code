package aoc;

public class Day01 {
    public long part1(String input) {
        return 0L;
    }

    public long part2(String input) {
        return 0L;
    }

    public static void main(String[] args) {
        Day01 day = new Day01();
        String input = "day01.txt";

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