package aoc;

import aoc.utils.Direction;

import java.awt.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Set;

public class Day24 {
    private static boolean[][] parse(String input) {
        String[] lines = input.replaceAll("\r\n", "\n").split("\n");
        int height = lines.length, width = lines[0].length();
        boolean[][] grid = new boolean[height][width];

        for (int y = 0; y < height; y++) {
            char[] row = lines[y].toCharArray();
            for (int x = 0; x < width; x++) {
                grid[y][x] = row[x] == '#';
            }
        }

        return grid;
    }

    private static void show(boolean[][] grid) {
        for (boolean[] booleans : grid) {
            for (boolean b : booleans) {
                System.out.print(b ? '#' : '.');
            }
            System.out.println();
        }
        System.out.println();
    }

    private static long biodiversityRating(boolean[][] grid) {
        long rating = 0L;
        int height = grid.length, width = grid[0].length;

        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                if (grid[y][x]) rating |= 1L << (y * width + x);
            }
        }

        return rating;
    }

    private static int countNeighbors(boolean[][] grid, int x, int y) {
        int height = grid.length, width = grid[0].length, count = 0;

        for (Direction d : Direction.values()) {
            Point n = d.move(x, y);
            if (0 > n.x || n.x >= width || 0 > n.y || n.y >= height) continue;
            if (grid[n.y][n.x]) count++;
        }

        return count;
    }

    private static boolean[][] evolve(boolean[][] grid) {
        int height = grid.length, width = grid[0].length;
        boolean[][] newGrid = new boolean[height][width];

        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                int neighbors = countNeighbors(grid, x, y);

                if (grid[y][x]) {
                    newGrid[y][x] = neighbors == 1;
                } else {
                    newGrid[y][x] = neighbors == 1 || neighbors == 2;
                }
            }
        }

        return newGrid;
    }

    public long part1(String input) {
        boolean[][] grid = parse(input);
        long rating = biodiversityRating(grid);

        Set<Long> seen = new HashSet<>();
        while (!seen.contains(rating)) {
            seen.add(rating);
            grid = evolve(grid);
            rating = biodiversityRating(grid);
        }

        return rating;
    }

    public long part2(String input) {
        return 0L;
    }

    public static void main(String[] args) throws Exception {
        Day24 day = new Day24();
        String filepath = "src/main/resources/day24.txt";
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