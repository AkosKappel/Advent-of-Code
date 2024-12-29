package aoc;

import aoc.utils.Direction;
import aoc.utils.Point3D;
import aoc.utils.Triple;

import java.awt.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Queue;
import java.util.*;

public class Day20 {
    private static final char WALL = '#';
    private static final char PASSAGE = '.';
    private static final char SPACE = ' ';

    private static Triple<Map<Point, Point3D>, Point3D, Point3D> findPortals(char[][] map) {
        Map<Point, Point3D> portals = new HashMap<>();
        Map<String, Point> unpaired = new HashMap<>();

        int height = map.length, width = map[0].length;
        int padding = 2; // space taken by letters

        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                if (map[y][x] != PASSAGE) continue;

                Point position = new Point(x, y);

                Direction portalDirection = null;
                for (Direction dir : Direction.values()) {
                    Point neighbor = dir.move(position);
                    char cell = map[neighbor.y][neighbor.x];

                    if (Character.isLetter(cell)) {
                        portalDirection = dir;
                        break;
                    }
                }

                if (portalDirection == null) continue; // no portal nearby

                Point p1 = portalDirection.move(position);
                Point p2 = portalDirection.move(p1);
                char letter1 = map[p1.y][p1.x];
                char letter2 = map[p2.y][p2.x];

                String portalName = portalDirection == Direction.DOWN || portalDirection == Direction.RIGHT
                        ? String.valueOf(letter1) + letter2
                        : String.valueOf(letter2) + letter1;

                if (unpaired.containsKey(portalName)) {
                    boolean isOuter = x == padding || x == width - padding - 1
                            || y == padding || y == height - padding - 1;
                    int levelDifference = isOuter ? -1 : 1;

                    Point portalPair = unpaired.get(portalName);
                    portals.put(position, new Point3D(portalPair.x, portalPair.y, levelDifference));
                    portals.put(portalPair, new Point3D(position.x, position.y, -levelDifference));
                    unpaired.remove(portalName);
                } else {
                    unpaired.put(portalName, position);
                }
            }
        }

        Point start = unpaired.get("AA");
        Point end = unpaired.get("ZZ");
        return new Triple<>(portals, new Point3D(start.x, start.y, 0), new Point3D(end.x, end.y, 0));
    }

    private static List<Point3D> getNeighbors(Point3D pos, char[][] grid, Map<Point, Point3D> portals, boolean useLevels) {
        List<Point3D> neighbors = new LinkedList<>();
        int height = grid.length, width = grid[0].length;

        for (Direction dir : Direction.values()) {
            Point3D neighbor = dir.move(pos);

            boolean inBoundsX = 0 <= neighbor.x() && neighbor.x() < width;
            boolean inBoundsY = 0 <= neighbor.y() && neighbor.y() < height;
            if (!inBoundsX || !inBoundsY) continue;

            if (grid[neighbor.y()][neighbor.x()] == PASSAGE) {
                neighbors.add(new Point3D(neighbor.x(), neighbor.y(), pos.z()));
            }
        }

        Point current = new Point(pos.x(), pos.y());
        if (portals.containsKey(current)) {
            Point3D portal = portals.get(current);
            int level = useLevels ? portal.z() : 0;

            if (pos.z() + level >= 0) {
                neighbors.add(new Point3D(portal.x(), portal.y(), pos.z() + level));
            }
        }

        return neighbors;
    }

    private static int dijkstra(char[][] map, Point3D start, Point3D end, Map<Point, Point3D> portals, boolean useLevels) {
        Map<Point3D, Integer> distances = new HashMap<>();

        Queue<Map.Entry<Point3D, Integer>> queue = new PriorityQueue<>(Map.Entry.comparingByValue());
        queue.add(Map.entry(start, 0));

        while (!queue.isEmpty()) {
            Map.Entry<Point3D, Integer> entry = queue.poll();
            Point3D current = entry.getKey();
            int distance = entry.getValue();

            if (current.equals(end)) return distance;

            for (Point3D neighbor : getNeighbors(current, map, portals, useLevels)) {
                int newDistance = distance + 1;
                if (newDistance < distances.getOrDefault(neighbor, Integer.MAX_VALUE)) {
                    distances.put(neighbor, newDistance);
                    queue.add(Map.entry(neighbor, newDistance));
                }
            }
        }

        throw new IllegalStateException("No path found from " + start + " to " + end);
    }

    private static char[][] parse(String input) {
        String[] lines = input.replaceAll("\r\n", "\n").split("\n");
        int height = lines.length;
        int width = Arrays.stream(lines).mapToInt(String::length).max().orElseThrow();
        char[][] grid = new char[height][width];

        for (int y = 0; y < height; y++) {
            char[] row = lines[y].toCharArray();
            for (int x = 0; x < width; x++) {
                grid[y][x] = x < row.length ? row[x] : SPACE;
            }
        }

        return grid;
    }

    public long part1(String input) {
        char[][] map = parse(input);

        Triple<Map<Point, Point3D>, Point3D, Point3D> results = findPortals(map);
        Map<Point, Point3D> portals = results.first();
        Point3D start = results.second();
        Point3D end = results.third();

        return dijkstra(map, start, end, portals, false);
    }

    public long part2(String input) {
        char[][] map = parse(input);

        Triple<Map<Point, Point3D>, Point3D, Point3D> results = findPortals(map);
        Map<Point, Point3D> portals = results.first();
        Point3D start = results.second();
        Point3D end = results.third();

        return dijkstra(map, start, end, portals, true);
    }

    public static void main(String[] args) throws Exception {
        Day20 day = new Day20();
        String filepath = "src/main/resources/day20.txt";
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