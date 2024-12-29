package aoc;

import java.awt.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Day19 {
    private static final int SIDE_LENGTH = 100;

    private static boolean scan(IntcodeComputer computer, int x, int y) {
        computer.restart();
        computer.addInput(x, y);
        computer.run();
        return computer.readOutput() == 1;
    }

    private static Point getWidth(IntcodeComputer computer, int x) {
        int top = 0;
        while (!scan(computer, x, top)) top++;

        if (!scan(computer, x, top + SIDE_LENGTH)) {
            return new Point(0, 0);  // too short
        }

        int bottom = top + SIDE_LENGTH + 1;
        while (scan(computer, x, bottom)) bottom++;

        int y = bottom - SIDE_LENGTH;

        int width = 1;
        while (scan(computer, x + width, y)) width++;

        return new Point(width, y);
    }

    private static Point binarySearch(IntcodeComputer computer, int min, int max) {
        Point best = null;

        while (min < max) {
            int x = (min + max) / 2;
            Point p = getWidth(computer, x);
            int width = p.x, y = p.y;

            if (width > SIDE_LENGTH) {
                max = x;
                best = new Point(x, y);
            } else {
                min = x + 1;
            }
        }

        assert best != null;
        return best;
    }

    public long part1(String input) {
        IntcodeComputer computer = IntcodeComputer.fromString(input);
        int result = 0;

        for (int y = 0; y < 50; y++) {
            for (int x = 0; x < 50; x++) {
                if (scan(computer, x, y)) {
                    result++;
                }
            }
        }

        return result;
    }

    public long part2(String input) {
        IntcodeComputer program = IntcodeComputer.fromString(input);

        Point approximation = binarySearch(program, 10, 9999);
        Point best = approximation;

        for (int x = approximation.x; x >= approximation.x - 10; x--) {
            Point p = getWidth(program, x);
            int width = p.x, y = p.y;
            if (width >= SIDE_LENGTH) best = new Point(x, y);
        }

        return best.x * 10000L + best.y;
    }

    public static void main(String[] args) throws Exception {
        Day19 day = new Day19();
        String filepath = "src/main/resources/day19.txt";
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