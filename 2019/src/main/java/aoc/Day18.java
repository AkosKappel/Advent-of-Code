package aoc;

import java.awt.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Queue;
import java.util.*;

public class Day18 {
    private static final char WALL = '#';
    private static final char OPEN = '.';
    private static final char ENTRANCE = '@';

    private record Edge(Character to, int weight) {
    }

    private record Triple<A, B, C>(A a, B b, C c) {
    }

    private static final Map<Triple<Character, Integer, Set<Character>>, Long> memo = new HashMap<>();

    private static boolean isKey(char c) {
        return 'a' <= c && c <= 'z';
    }

    private static boolean isDoor(char c) {
        return 'A' <= c && c <= 'Z';
    }

    private static Map<Character, List<Edge>> buildGraph(String input) {
        Map<Character, List<Edge>> graph = new HashMap<>();

        String[] lines = input.replaceAll("\r\n", "\n").split("\n");
        int height = lines.length, width = lines[0].length();
        char[][] grid = new char[height][width];
        for (int y = 0; y < height; y++) {
            char[] row = lines[y].toCharArray();
            System.arraycopy(row, 0, grid[y], 0, width);
        }

        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                char cell = grid[y][x];
                if (cell == WALL || cell == OPEN) continue;

                Point p = new Point(x, y);
                List<Edge> edges = getEdges(p, grid);
                graph.put(cell, edges);
            }
        }

        return graph;
    }

    private static List<Edge> getEdges(Point from, char[][] grid) {
        List<Edge> edges = new LinkedList<>();
        Set<Point> visited = new HashSet<>();
        Queue<Map.Entry<Point, Integer>> queue = new ArrayDeque<>();
        queue.add(Map.entry(from, 0));

        while (!queue.isEmpty()) {
            Map.Entry<Point, Integer> current = queue.poll();
            Point position = current.getKey();
            int distance = current.getValue();

            if (visited.contains(position)) continue;
            visited.add(position);

            char cell = grid[position.y][position.x];
            if ((isKey(cell) || isDoor(cell)) && distance > 0) {
                edges.add(new Edge(cell, distance));
                continue;
            }

            for (Point neighbor : getNeighbors(position, grid)) {
                if (visited.contains(neighbor)) continue;
                queue.add(Map.entry(neighbor, distance + 1));
            }
        }

        return edges;
    }

    private static List<Point> getNeighbors(Point pos, char[][] grid) {
        List<Point> edges = new LinkedList<>();

        for (Direction dir : Direction.values()) {
            Point neighbor = dir.move(pos);
            if (grid[neighbor.y][neighbor.x] != WALL) {
                edges.add(neighbor);
            }
        }

        return edges;
    }

    private static long collectKeys(Map<Character, List<Edge>> graph, char current, int numRemainingKeys, Set<Character> collectedKeys) {
        if (numRemainingKeys == 0) return 0; // all keys have been collected

        Triple<Character, Integer, Set<Character>> key = new Triple<>(current, numRemainingKeys, new HashSet<>(collectedKeys));
        if (memo.containsKey(key)) return memo.get(key); // already calculated

        long shortestDistance = Long.MAX_VALUE;

        for (Edge edge : getReachableKeys(graph, current, collectedKeys)) {
            Set<Character> newCollectedKeys = new HashSet<>(collectedKeys);
            newCollectedKeys.add(edge.to);

            long distance = edge.weight;
            distance += collectKeys(graph, edge.to, numRemainingKeys - 1, newCollectedKeys);

            shortestDistance = Math.min(shortestDistance, distance);
        }

        memo.put(key, shortestDistance); // memoize result
        return shortestDistance;
    }

    private static Set<Edge> getReachableKeys(Map<Character, List<Edge>> graph, char current, Set<Character> collectedKeys) {
        Set<Edge> reachableKeys = new HashSet<>();
        Map<Character, Integer> distances = new HashMap<>();
        Queue<Map.Entry<Character, Integer>> pq = new PriorityQueue<>(Map.Entry.comparingByValue());
        pq.add(Map.entry(current, 0));

        while (!pq.isEmpty()) {
            Map.Entry<Character, Integer> entry = pq.poll();
            char currentNode = entry.getKey();
            int currentDistance = entry.getValue();

            if (isKey(currentNode) && !collectedKeys.contains(currentNode)) {
                reachableKeys.add(new Edge(currentNode, currentDistance));
                continue;
            }

            if (isDoor(currentNode) && !collectedKeys.contains(Character.toLowerCase(currentNode))) {
                continue; // we don't have key for this door
            }

            for (Edge edge : graph.get(currentNode)) {
                char neighbor = edge.to;
                int newDistance = currentDistance + edge.weight;
                if (newDistance >= distances.getOrDefault(neighbor, Integer.MAX_VALUE)) continue;

                distances.put(neighbor, newDistance);
                pq.add(Map.entry(neighbor, newDistance));
            }
        }

        return reachableKeys;
    }

    public long part1(String input) {
        Map<Character, List<Edge>> graph = buildGraph(input);
        long numKeys = graph.keySet().stream().filter(Day18::isKey).count();
        return collectKeys(graph, ENTRANCE, (int) numKeys, new HashSet<>());
    }

    public long part2(String input) {
        return 0L;
    }

    public static void main(String[] args) throws Exception {
        Day18 day = new Day18();
        String filepath = "src/main/resources/day18.txt";
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