package aoc;

import java.awt.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

public class Day17 {
    private static final char EMPTY = '.';
    private static final char SCAFFOLD = '#';

    private String[] scanGrid(String input) {
        IntcodeComputer program = IntcodeComputer.fromString(input);
        program.setOutputSize(-1);
        program.run();
        String grid = program
                .getOutput()
                .stream()
                .map(x -> String.valueOf((char) x.intValue()))
                .collect(Collectors.joining(""));
        return grid.split("\n");
    }

    private List<Point> findIntersections(String[] grid) {
        int height = grid.length, width = grid[0].length();
        List<Point> intersections = new LinkedList<>();

        for (int y = 1; y < height - 1; y++) {
            for (int x = 1; x < width - 1; x++) {
                if (grid[y].charAt(x) == EMPTY) continue;
                if (grid[y - 1].charAt(x) != SCAFFOLD) continue;
                if (grid[y + 1].charAt(x) != SCAFFOLD) continue;
                if (grid[y].charAt(x - 1) != SCAFFOLD) continue;
                if (grid[y].charAt(x + 1) != SCAFFOLD) continue;
                intersections.add(new Point(x, y));
            }
        }

        return intersections;
    }

    public long part1(String input) {
        String[] grid = scanGrid(input);
        List<Point> intersections = findIntersections(grid);
        return intersections.stream().mapToInt(p -> p.x * p.y).sum();
    }

    public long part2(String input) {
        return 0L;
    }

    public static void main(String[] args) throws Exception {
        Day17 day = new Day17();
        String filepath = "src/main/resources/day17.txt";
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