package aoc;

import java.awt.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.*;

public class Day10 {
    private static Set<Point> parse(String input) {
        String[] lines = input.replaceAll("\r\n", "\n").split("\n");
        Set<Point> asteroids = new HashSet<>();

        for (int y = 0; y < lines.length; y++) {
            char[] line = lines[y].toCharArray();
            for (int x = 0; x < line.length; x++) {
                if (line[x] == '#') {
                    asteroids.add(new Point(x, y));
                }
            }
        }

        return asteroids;
    }

    private static int manhattanDistance(Point p1, Point p2) {
        return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    }

    private static double calculateAngle(int x, int y) {
        double angle = Math.atan2(y, x);
        double shifted = angle + Math.PI / 2;
        if (shifted < 0) shifted += 2 * Math.PI;
        return shifted % (2 * Math.PI);
    }

    private static Map<Double, List<Point>> countAngles(Point p1, Set<Point> asteroids) {
        Map<Double, List<Point>> angles = new HashMap<>();

        for (Point p2 : asteroids) {
            if (p1.equals(p2)) continue;

            int dx = p2.x - p1.x;
            int dy = p2.y - p1.y;

            double angle = calculateAngle(dx, dy);
            angles.computeIfAbsent(angle, k -> new LinkedList<>()).add(p2);
        }

        return angles;
    }

    private static Map.Entry<Point, Map<Double, List<Point>>> findBestLocation(Set<Point> asteroids) {
        Point bestLocation = null;
        Map<Double, List<Point>> bestAngles = null;
        int maxVisible = 0;

        for (Point p1 : asteroids) {
            Map<Double, List<Point>> angles = countAngles(p1, asteroids);
            int visible = angles.size();

            if (visible > maxVisible) {
                maxVisible = visible;
                bestLocation = p1;
                bestAngles = angles;
            }
        }

        // sort list of asteroids for each angle by manhattan distance to best location
        Point imsLocation = bestLocation;
        for (List<Point> points : bestAngles.values()) {
            points.sort(Comparator.comparingInt(p -> manhattanDistance(imsLocation, p)));
        }

        return new AbstractMap.SimpleEntry<>(bestLocation, bestAngles);
    }

    public long part1(String input) {
        Set<Point> asteroids = parse(input);
        Map.Entry<Point, Map<Double, List<Point>>> bestLocation = findBestLocation(asteroids);
        Map<Double, List<Point>> angles = bestLocation.getValue();
        return angles.size();
    }

    public long part2(String input) {
        Set<Point> asteroids = parse(input);
        Map.Entry<Point, Map<Double, List<Point>>> bestLocation = findBestLocation(asteroids);

        List<Map.Entry<Double, List<Point>>> sortedAngles = bestLocation
                .getValue()
                .entrySet()
                .stream()
                .sorted(Comparator.comparingDouble(Map.Entry::getKey))
                .toList();

        final int target = 200;
        int removed = 0;

        int totalPoints = sortedAngles.stream().mapToInt(entry -> entry.getValue().size()).sum();
        assert totalPoints >= target : "Not enough asteroids to remove " + target + "th";

        while (removed < target) {
            for (Map.Entry<Double, List<Point>> angle : sortedAngles) {
                List<Point> points = angle.getValue();
                if (!points.isEmpty()) {
                    Point p = points.remove(0);
                    if (++removed == target) return p.x * 100L + p.y;
                }
            }
        }

        throw new IllegalStateException("No solution found");
    }

    public static void main(String[] args) throws Exception {
        Day10 day = new Day10();
        String filepath = "src/main/resources/day10.txt";
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