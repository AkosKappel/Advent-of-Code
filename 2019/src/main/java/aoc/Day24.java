package aoc;

import aoc.utils.Direction;

import java.awt.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class Day24 {
    private static boolean[][] parse(String input, boolean isRecursive) {
        String[] lines = input.replaceAll("\r\n", "\n").split("\n");
        int height = lines.length, width = lines[0].length();
        boolean[][] grid = new boolean[height][width];

        for (int y = 0; y < height; y++) {
            char[] row = lines[y].toCharArray();
            for (int x = 0; x < width; x++) {
                grid[y][x] = row[x] == '#';
            }
        }

        if (isRecursive) { // middle is always empty
            int middleX = width / 2, middleY = height / 2;
            grid[middleY][middleX] = false;
        }

        return grid;
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

    private static int countNeighbors(boolean[][] grid, int x, int y, boolean[][] inner, boolean[][] outer) {
        int height = grid.length, width = grid[0].length;
        int centerX = width / 2, centerY = height / 2;
        int count = 0;

        for (Direction d : Direction.values()) { // same level neighbors
            Point n = d.move(x, y);
            if (0 > n.x || n.x >= width || 0 > n.y || n.y >= height) continue;
            if (grid[n.y][n.x]) count++;
        }

        if (outer != null) { // outer level neighbors
            if (x == 0 && outer[centerY][centerX - 1]) count++;  // left
            if (y == 0 && outer[centerY - 1][centerX]) count++;  // up
            if (x == width - 1 && outer[centerY][centerX + 1]) count++;  // right
            if (y == height - 1 && outer[centerY + 1][centerX]) count++;  // down
        }

        if (inner != null) { // inner level neighbors
            if (y == centerY && x == centerX - 1) {  // left
                for (int i = 0; i < height; i++) {
                    if (inner[i][0]) count++;
                }
            } else if (y == centerY - 1 && x == centerX) {  // up
                for (int i = 0; i < width; i++) {
                    if (inner[0][i]) count++;
                }
            } else if (y == centerY && x == centerX + 1) {  // right
                for (int i = 0; i < height; i++) {
                    if (inner[i][width - 1]) count++;
                }
            } else if (y == centerY + 1 && x == centerX) {  // down
                for (int i = 0; i < width; i++) {
                    if (inner[height - 1][i]) count++;
                }
            }
        }

        return count;
    }

    private static boolean willBeAlive(boolean isAliveNow, int numNeighbors) {
        if (isAliveNow) return numNeighbors == 1;
        return numNeighbors == 1 || numNeighbors == 2;
    }

    private static boolean[][] evolve(boolean[][] grid) {
        int height = grid.length, width = grid[0].length;
        boolean[][] newGrid = new boolean[height][width];

        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                int neighbors = countNeighbors(grid, x, y, null, null);
                newGrid[y][x] = willBeAlive(grid[y][x], neighbors);
            }
        }

        return newGrid;
    }

    private static boolean[][] evolveRecursive(Map<Integer, boolean[][]> grids, int level) {
        boolean[][] grid = grids.get(0);
        int height = grid.length, width = grid[0].length;
        int centerX = width / 2, centerY = height / 2;

        grid = grids.getOrDefault(level, new boolean[height][width]); // retrieve or create new empty grid for level

        boolean[][] newGrid = new boolean[height][width];
        boolean[][] outer = grids.get(level + 1);
        boolean[][] inner = grids.get(level - 1);

        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                if (x == centerX && y == centerY) continue; // skip center cell

                int neighbors = countNeighbors(grid, x, y, inner, outer);
                newGrid[y][x] = willBeAlive(grid[y][x], neighbors);
            }
        }

        return newGrid;
    }

    public long part1(String input) {
        boolean[][] grid = parse(input, false);
        long rating = biodiversityRating(grid);

        Set<Long> seen = new HashSet<>();
        while (!seen.contains(rating)) {
            seen.add(rating);
            grid = evolve(grid);
            rating = biodiversityRating(grid);
        }

        return rating;
    }

    public long part2(String input, int minutes) {
        Map<Integer, boolean[][]> grids = new HashMap<>();
        grids.put(0, parse(input, true));

        int minLevel = 0, maxLevel = 0;

        for (int i = 0; i < minutes; i++) {
            Map<Integer, boolean[][]> newGrids = new HashMap<>();

            for (int depth : grids.keySet()) {
                newGrids.put(depth, evolveRecursive(grids, depth));
            }

            minLevel--;
            newGrids.put(minLevel, evolveRecursive(grids, minLevel));

            maxLevel++;
            newGrids.put(maxLevel, evolveRecursive(grids, maxLevel));

            grids = newGrids;
        }

        long numBugs = 0;
        for (boolean[][] grid : grids.values()) {
            for (boolean[] row : grid) {
                for (boolean bug : row) {
                    if (bug) numBugs++;
                }
            }
        }
        return numBugs;
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
        long resultPart2 = day.part2(input, 200);
        long endPart2 = System.currentTimeMillis();
        System.out.println("Part 2: " + resultPart2 + " (" + (endPart2 - startPart2) + " ms)");
    }
}