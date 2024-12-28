package aoc;

import java.awt.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Set;

public class Day11 {
    private enum Direction {
        UP, LEFT, DOWN, RIGHT;

        public Direction turnLeft() {
            return values()[(ordinal() + 3) % 4];
        }

        public Direction turnRight() {
            return values()[(ordinal() + 1) % 4];
        }
    }

    private static class PaintingRobot {
        private Point pos = new Point(0, 0);
        private Direction dir = Direction.UP;
        private final Set<Point> painted = new HashSet<>();
        private final Set<Point> visited = new HashSet<>();

        public void run(IntcodeComputer program) {
            while (program.isRunning()) {
                long arg = isPaintedBelow() ? 1 : 0;
                boolean finished = program.run(arg);

                if (!finished) {
                    long color = program.readOutput();
                    long turn = program.readOutput();

                    paint(color);
                    turn(turn == 1);
                    forward();
                }
            }
        }

        public String showPanel() {
            int minX = visited.stream().mapToInt(p -> p.x).min().orElse(0);
            int maxX = visited.stream().mapToInt(p -> p.x).max().orElse(0);
            int minY = visited.stream().mapToInt(p -> p.y).min().orElse(0);
            int maxY = visited.stream().mapToInt(p -> p.y).max().orElse(0);

            StringBuilder sb = new StringBuilder();
            StringBuilder line = new StringBuilder();

            for (int y = minY; y <= maxY; y++) {
                for (int x = minX; x <= maxX; x++) {
                    Point p = new Point(x, y);
                    if (painted.contains(p)) line.append('█');
                    else line.append(" ");
                }
                sb.append(line.reverse());
                sb.append("\n");
                line.setLength(0);
            }

            return sb.toString();
        }

        public boolean isPaintedBelow() {
            return painted.contains(pos);
        }

        public void paint(long color) {
            if (color == 1) painted.add(pos);
            else if (color == 0) painted.remove(pos);
            visited.add(pos);
        }

        public void forward() {
            switch (dir) {
                case UP -> pos = new Point(pos.x, pos.y - 1);
                case LEFT -> pos = new Point(pos.x - 1, pos.y);
                case DOWN -> pos = new Point(pos.x, pos.y + 1);
                case RIGHT -> pos = new Point(pos.x + 1, pos.y);
            }
        }

        public void turn(boolean clockwise) {
            if (clockwise) dir = dir.turnRight();
            else dir = dir.turnLeft();
        }
    }

    public long part1(String input) {
        IntcodeComputer program = IntcodeComputer.fromString(input);
        program.setOutputSize(2);

        PaintingRobot robot = new PaintingRobot();
        robot.run(program);

        return robot.visited.size();
    }

    public String part2(String input) {
        IntcodeComputer program = IntcodeComputer.fromString(input);
        program.setOutputSize(2);

        PaintingRobot robot = new PaintingRobot();
        robot.paint(1); // paint panel below robot to white
        robot.run(program);

        return robot.showPanel();
    }

    public static void main(String[] args) throws Exception {
        Day11 day = new Day11();
        String filepath = "src/main/resources/day11.txt";
        String input = Files.readString(Paths.get(filepath), StandardCharsets.UTF_8);

        long startPart1 = System.currentTimeMillis();
        long resultPart1 = day.part1(input);
        long endPart1 = System.currentTimeMillis();
        System.out.println("Part 1: " + resultPart1 + " (" + (endPart1 - startPart1) + " ms)");

        long startPart2 = System.currentTimeMillis();
        String resultPart2 = day.part2(input);
        long endPart2 = System.currentTimeMillis();
        System.out.println("Part 2:\n" + resultPart2 + " (" + (endPart2 - startPart2) + " ms)");
    }
}