package aoc;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

public class Day20 {
    private static final char WALL = '#';
    private static final char PASSAGE = '.';
    private static final char SPACE = ' ';

    private static final Point[] directions = {
            new Point(1, 0), // RIGHT
            new Point(0, 1), // DOWN
            new Point(-1, 0), // LEFT
            new Point(0, -1), // UP
    };

    private record Point(int... coords) {
        public int x() {
            return coords[0];
        }

        public void x(int x) {
            coords[0] = x;
        }

        public int y() {
            return coords[1];
        }

        public void y(int y) {
            coords[1] = y;
        }

        public int z() {
            return coords[2];
        }

        public void z(int z) {
            coords[2] = z;
        }

        public Point add(Point other) {
            assert coords.length == other.coords.length;
            int[] newCoords = new int[coords.length];
            for (int i = 0; i < coords.length; i++) {
                newCoords[i] = coords[i] + other.coords[i];
            }
            return new Point(newCoords);
        }

        public Point sub(Point other) {
            assert coords.length == other.coords.length;
            int[] newCoords = new int[coords.length];
            for (int i = 0; i < coords.length; i++) {
                newCoords[i] = coords[i] - other.coords[i];
            }
            return new Point(newCoords);
        }

        public int sum() {
            int total = 0;
            for (int coordinate : coords) {
                total += coordinate;
            }
            return total;
        }

        public char on(char[][] grid) {
            int _x = x(), _y = y();
            int height = grid.length, width = grid[0].length;
            if (_x < 0 || _x >= width || _y < 0 || _y >= height) return SPACE;
            return grid[_y][_x];
        }

        @Override
        public String toString() {
            return Arrays.toString(coords);
        }

        @Override
        public boolean equals(Object other) {
            if (!(other instanceof Point)) return false;
            return Arrays.equals(coords, ((Point) other).coords);
        }

        @Override
        public int hashCode() {
            return Arrays.hashCode(coords);
        }
    }

    private record Pair<A, B>(A a, B b) {
    }

    private static List<Point> getNeighbors(Point pos, char[][] grid) {
        List<Point> neighbors = new LinkedList<>();

        for (Point dir : directions) {
            Point neighbor = pos.add(dir);
            if (neighbor.on(grid) != WALL && neighbor.on(grid) != SPACE) {
                neighbors.add(neighbor);
            }
        }

        return neighbors;
    }

    private static Map<String, List<Point>> findPortals(char[][] map) {
        Map<String, List<Point>> portals = new HashMap<>();
        int height = map.length, width = map[0].length;

        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                if (map[y][x] != PASSAGE) continue;

                Point position = new Point(x, y);
                Point neighborPortal = getNeighbors(position, map).stream()
                        .filter(neighbor -> Character.isLetter(neighbor.on(map)))
                        .findFirst().orElse(null);

                if (neighborPortal == null) continue;

                Point portalDirection = neighborPortal.sub(position);
                char letter1 = neighborPortal.on(map);
                char letter2 = neighborPortal.add(portalDirection).on(map);

                String portalName = portalDirection.sum() > 0
                        ? String.valueOf(letter1) + letter2
                        : String.valueOf(letter2) + letter1;

                portals.computeIfAbsent(portalName, k -> new LinkedList<>()).add(position);
            }
        }

        return portals;
    }

    private static List<Pair<Point, Integer>> findPaths(Point start, char[][] map, Set<Point> nodes) {
        List<Pair<Point, Integer>> paths = new LinkedList<>();
        Set<Point> visited = new HashSet<>();
        Queue<Map.Entry<Point, Integer>> queue = new ArrayDeque<>();
        queue.add(Map.entry(start, 0));

        while (!queue.isEmpty()) {
            Map.Entry<Point, Integer> entry = queue.poll();
            Point current = entry.getKey();
            int distance = entry.getValue();

            if (visited.contains(current)) continue;
            visited.add(current);

            if (nodes.contains(current) && distance > 0) {
                paths.add(new Pair<>(current, distance));
                continue;
            }

            for (Point neighbor : getNeighbors(current, map)) {
                if (visited.contains(neighbor)) continue;
                queue.add(Map.entry(neighbor, distance + 1));
            }
        }

        return paths;
    }

    private static Map<Point, List<Pair<Point, Integer>>> buildGraph(char[][] map, Map<String, List<Point>> portals) {
        Map<Point, List<Pair<Point, Integer>>> graph = new HashMap<>();
        Set<Point> nodes = portals.values().stream().flatMap(List::stream).collect(Collectors.toSet());

        for (Map.Entry<String, List<Point>> entry : portals.entrySet()) {
            String portalName = entry.getKey();
            for (Point portalPosition : entry.getValue()) {
                List<Pair<Point, Integer>> edges = findPaths(portalPosition, map, nodes);

                for (Point otherPortal : portals.getOrDefault(portalName, Collections.emptyList())) {
                    if (otherPortal.equals(portalPosition)) continue;
                    edges.add(new Pair<>(otherPortal, 1));
                }

                graph.put(portalPosition, edges);
            }
        }

        return graph;
    }

    private static int dijkstra(Map<Point, List<Pair<Point, Integer>>> graph, Point start, Point end) {
        Map<Point, Integer> distances = new HashMap<>();
        Queue<Map.Entry<Point, Integer>> queue = new PriorityQueue<>(Map.Entry.comparingByValue());
        queue.add(Map.entry(start, 0));

        while (!queue.isEmpty()) {
            Map.Entry<Point, Integer> entry = queue.poll();
            Point current = entry.getKey();
            int distance = entry.getValue();

            if (current.equals(end)) return distance;

            for (Pair<Point, Integer> edge : graph.getOrDefault(current, Collections.emptyList())) {
                Point neighbor = edge.a;
                int weight = edge.b;

                if (distances.getOrDefault(neighbor, Integer.MAX_VALUE) > distance + weight) {
                    distances.put(neighbor, distance + weight);
                    queue.add(Map.entry(neighbor, distance + weight));
                }
            }
        }

        return Integer.MAX_VALUE;
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

        Map<String, List<Point>> portals = findPortals(map);
        Point start = portals.get("AA").get(0);
        Point end = portals.get("ZZ").get(0);

        Map<Point, List<Pair<Point, Integer>>> graph = buildGraph(map, portals);
        return dijkstra(graph, start, end);
    }

    public long part2(String input) {
        return 0L;
    }

    public static void main(String[] args) throws Exception {
        Day20 day = new Day20();
        String filepath = "src/main/resources/day20_example.txt";
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