package aoc;

import java.awt.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Queue;
import java.util.*;

public class Day15 {
    private enum Direction {
        NONE, NORTH, SOUTH, WEST, EAST;

        public Direction turnLeft() {
            return switch (this) {
                case NORTH -> WEST;
                case WEST -> SOUTH;
                case SOUTH -> EAST;
                case EAST -> NORTH;
                default -> throw new IllegalStateException("Unexpected direction: " + this);
            };
        }

        public Direction turnRight() {
            return switch (this) {
                case NORTH -> EAST;
                case EAST -> SOUTH;
                case SOUTH -> WEST;
                case WEST -> NORTH;
                default -> throw new IllegalStateException("Unexpected direction: " + this);
            };
        }

        public Point move(Point position) {
            return switch (this) {
                case NORTH -> new Point(position.x, position.y - 1);
                case WEST -> new Point(position.x - 1, position.y);
                case SOUTH -> new Point(position.x, position.y + 1);
                case EAST -> new Point(position.x + 1, position.y);
                default -> throw new IllegalStateException("Unexpected direction: " + this);
            };
        }
    }

    private enum AndroidResponse {
        WALL, MOVED, FOUND
    }

    private static class RepairAndroid {
        private final IntcodeComputer computer;
        private final Point startPosition = new Point(0, 0);
        private final Direction startDirection = Direction.NORTH;

        public RepairAndroid(String code) {
            computer = IntcodeComputer.fromString(code);
            computer.setOutputSize(1);
        }

        public AndroidResponse checkMove(Direction direction) {
            computer.addInput(direction.ordinal());
            computer.run();
            long response = computer.readOutput();

            return switch ((int) response) {
                case 0 -> AndroidResponse.WALL;
                case 1 -> AndroidResponse.MOVED;
                case 2 -> AndroidResponse.FOUND;
                default -> throw new IllegalStateException("Unexpected output: " + response);
            };
        }

        public Map.Entry<Point, Set<Point>> followWall() {
            Point oxygenPosition = null;
            Set<Point> maze = new HashSet<>();

            Point currentPosition = startPosition;
            Direction currentDirection = startDirection;

            do {
                Direction newDirection = currentDirection.turnRight();
                Point newPosition = newDirection.move(currentPosition);
                AndroidResponse response = checkMove(newDirection);

                if (response == AndroidResponse.WALL) {
                    newPosition = currentDirection.move(currentPosition);
                    response = checkMove(currentDirection);

                    if (response == AndroidResponse.WALL) {
                        currentDirection = currentDirection.turnLeft();
                    } else {
                        if (response == AndroidResponse.FOUND) {
                            oxygenPosition = newPosition;
                        }
                        maze.add(newPosition);
                        currentPosition = newPosition;
                    }
                } else {
                    if (response == AndroidResponse.FOUND) {
                        oxygenPosition = newPosition;
                    }
                    maze.add(newPosition);
                    currentPosition = newPosition;
                    currentDirection = newDirection;
                }

            } while (!currentPosition.equals(startPosition) || !currentDirection.equals(startDirection));

            assert oxygenPosition != null : "Oxygen position not found";
            return new AbstractMap.SimpleEntry<>(oxygenPosition, maze);
        }
    }

    private static List<Point> getNeighbors(Point position, Set<Point> maze) {
        List<Point> neighbors = new LinkedList<>();

        for (Direction direction : Direction.values()) {
            if (direction == Direction.NONE) continue;
            Point neighbor = direction.move(position);
            if (maze.contains(neighbor)) neighbors.add(neighbor);
        }

        return neighbors;
    }

    private int BFS(Set<Point> maze, Point start, Point end) {
        Set<Point> visited = new HashSet<>();
        Queue<Map.Entry<Point, Integer>> queue = new LinkedList<>();
        queue.add(Map.entry(start, 0));

        int maxDistance = Integer.MIN_VALUE;

        while (!queue.isEmpty()) {
            Map.Entry<Point, Integer> current = queue.poll();
            Point position = current.getKey();
            int distance = current.getValue();

            maxDistance = Math.max(maxDistance, distance);

            if (position.equals(end)) return distance;
            if (visited.contains(position)) continue;

            visited.add(position);

            for (Point neighbor : getNeighbors(position, maze)) {
                if (visited.contains(neighbor)) continue;
                queue.add(Map.entry(neighbor, distance + 1));
            }
        }

        return maxDistance;
    }

    public long part1(String input) {
        RepairAndroid android = new RepairAndroid(input);

        Map.Entry<Point, Set<Point>> crawledSpace = android.followWall();
        Point oxygen = crawledSpace.getKey();
        Set<Point> maze = crawledSpace.getValue();

        Point start = new Point(0, 0);
        return BFS(maze, start, oxygen);
    }

    public long part2(String input) {
        RepairAndroid android = new RepairAndroid(input);

        Map.Entry<Point, Set<Point>> crawledSpace = android.followWall();
        Point oxygen = crawledSpace.getKey();
        Set<Point> maze = crawledSpace.getValue();

        Point unreachable = new Point(Integer.MAX_VALUE, Integer.MAX_VALUE);
        return BFS(maze, oxygen, unreachable); // explore the whole space
    }

    public static void main(String[] args) throws Exception {
        Day15 day = new Day15();
        String filepath = "src/main/resources/day15.txt";
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