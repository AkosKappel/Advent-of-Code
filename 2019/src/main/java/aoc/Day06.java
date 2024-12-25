package aoc;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

public class Day06 {
    private final String ROOT = "COM";
    private final String ME = "YOU";
    private final String SANTA = "SAN";

    private Map<String, Set<String>> orbits;

    public Day06() {
        this.orbits = null;
    }

    private static Map<String, Set<String>> parse(String input) {
        String[] lines = input.replaceAll("\r\n", "\n").split("\n");
        Map<String, Set<String>> orbits = new HashMap<>();

        for (String line : lines) {
            String[] parts = line.split("\\)");
            String parent = parts[0];
            String child = parts[1];
            Set<String> children = orbits.getOrDefault(parent, new HashSet<>());
            children.add(child);
            orbits.put(parent, children);
        }

        return orbits;
    }

    private int countOrbits(String current, int depth) {
        int count = depth;
        for (String child : orbits.getOrDefault(current, new HashSet<>())) {
            count += countOrbits(child, depth + 1);
        }
        return count;
    }

    private Stack<String> findPath(String current, String target) {
        if (current.equals(target)) {
            Stack<String> path = new Stack<>();
            path.add(current);
            return path;
        }

        for (String child : orbits.getOrDefault(current, new HashSet<>())) {
            Stack<String> path = findPath(child, target);
            if (path == null) continue;
            path.add(current);
            return path;
        }

        return null;
    }

    private Integer countTransfers(String child1, String child2) {
        Stack<String> path1 = findPath(ROOT, child1);
        Stack<String> path2 = findPath(ROOT, child2);

        if (path1 == null || path2 == null) return null;

        while (!path1.isEmpty() && !path2.isEmpty()) {
            String current1 = path1.pop();
            String current2 = path2.pop();
            if (!current1.equals(current2)) {
                return path1.size() + path2.size();
            }
        }

        return null;
    }

    public long part1(String input) {
        orbits = parse(input);
        return countOrbits(ROOT, 0);
    }

    public long part2(String input) {
        orbits = parse(input);
        Integer transfers = countTransfers(ME, SANTA);
        assert transfers != null;
        return transfers;
    }

    public static void main(String[] args) throws Exception {
        Day06 day = new Day06();
        String filepath = "src/main/resources/day06.txt";
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