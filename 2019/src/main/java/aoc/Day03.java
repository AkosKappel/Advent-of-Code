package aoc;

import java.awt.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

public class Day03 {

    private static List<List<Point>> parse(String input) {
        String[] lines = input.replaceAll("\r\n", "\n").split("\n");

        List<List<Point>> wires = new LinkedList<>();

        for (String line : lines) {
            List<Point> wire = new LinkedList<>();

            int x = 0;
            int y = 0;

            for (String part : line.split(",")) {
                char direction = part.charAt(0);
                int distance = Integer.parseInt(part.substring(1));
                for (int i = 0; i < distance; i++) {
                    switch (direction) {
                        case 'U' -> y++;
                        case 'D' -> y--;
                        case 'L' -> x--;
                        case 'R' -> x++;
                    }
                    wire.add(new Point(x, y));
                }
            }

            wires.add(wire);
        }

        return wires;
    }

    private static Set<Point> getIntersections(List<List<Point>> wires) {
        Set<Point> intersection = new HashSet<>(wires.get(0));

        for (List<Point> wire : wires) {
            intersection.retainAll(new HashSet<>(wire));
        }

        return intersection;
    }

    private static int manhattanDistance(Point p1, Point p2) {
        return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    }

    public long part1(String input) {
        List<List<Point>> wires = parse(input);
        Set<Point> intersections = getIntersections(wires);

        final Point origin = new Point(0, 0);
        int minDistance = Integer.MAX_VALUE;

        for (Point p : intersections) {
            int distance = manhattanDistance(p, origin);
            minDistance = Math.min(minDistance, distance);
        }

        return minDistance;
    }

    public long part2(String input) {
        List<List<Point>> wires = parse(input);
        Set<Point> intersections = getIntersections(wires);

        int minDistance = Integer.MAX_VALUE;

        for (Point p : intersections) {
            int totalDistance = 0;
            for (List<Point> wire : wires) {
                totalDistance += wire.indexOf(p) + 1;
            }
            minDistance = Math.min(minDistance, totalDistance);
        }

        return minDistance;
    }

    public static void main(String[] args) throws Exception {
        Day03 day = new Day03();
        String filepath = "src/main/resources/day03.txt";
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