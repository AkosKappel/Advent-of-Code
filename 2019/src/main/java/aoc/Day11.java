package aoc;

import java.awt.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Queue;
import java.util.*;

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

    private static class IntcodeComputer {
        private long[] program;
        private long ip = 0;
        private long relativeBase = 0;
        private final Queue<Long> input;
        private final Queue<Long> output;
        private boolean isRunning = true;

        public IntcodeComputer(long[] program, long[] input) {
            this.program = program;
            this.input = new ArrayDeque<>();
            for (long i : input) this.input.add(i);
            this.output = new ArrayDeque<>();
        }

        public Long getOutput() {
            return output.poll();
        }

        private void increaseMemory(int newSize) {
            long[] newMemory = new long[newSize];
            System.arraycopy(program, 0, newMemory, 0, program.length);
            program = newMemory;
        }

        private long memoryAt(long address) {
            if (address < 0) return 0;
            if (address >= program.length) increaseMemory(Math.max(program.length * 2, (int) address + 1));
            return program[(int) address];
        }

        private void setMemoryAt(long address, long value) {
            if (address < 0) return; // ignore negative indices
            if (address >= program.length) increaseMemory(Math.max(program.length * 2, (int) address + 1));
            program[(int) address] = value;
        }

        private long read(long param, int mode) {
            return switch (mode) {
                case 0 -> memoryAt(param); // position mode
                case 1 -> param; // immediate mode
                case 2 -> memoryAt(param + relativeBase); // relative mode
                default -> throw new IllegalArgumentException("Invalid parameter mode for read operation: " + mode);
            };
        }

        private void write(long param, int mode, long value) {
            switch (mode) {
                case 0 -> setMemoryAt(param, value);
                case 2 -> setMemoryAt(param + relativeBase, value);
                default -> throw new IllegalArgumentException("Invalid parameter mode for write operation: " + mode);
            }
        }

        private void run(long[] args) {
            for (long arg : args) input.add(arg);
            while (isRunning) {
                String instruction = String.format("%05d", memoryAt(ip));
                int opcode = Integer.parseInt(instruction.substring(3));

                if (opcode == 99) {
                    isRunning = false;
                    return;
                }

                int mode1 = instruction.charAt(2) - '0';
                int mode2 = instruction.charAt(1) - '0';
                int mode3 = instruction.charAt(0) - '0';

                long param1 = memoryAt(ip + 1);
                long param2 = memoryAt(ip + 2);
                long param3 = memoryAt(ip + 3);

                switch (opcode) {
                    case 1:
                        write(param3, mode3, read(param1, mode1) + read(param2, mode2));
                        ip += 4;
                        break;
                    case 2:
                        write(param3, mode3, read(param1, mode1) * read(param2, mode2));
                        ip += 4;
                        break;
                    case 3:
                        if (input.isEmpty()) throw new IllegalArgumentException("Missing input");
                        write(param1, mode1, input.poll());
                        ip += 2;
                        break;
                    case 4:
                        output.add(read(param1, mode1));
                        ip += 2;
                        if (output.size() == 2) return;
                        break;
                    case 5:
                        ip = read(param1, mode1) != 0 ? read(param2, mode2) : ip + 3;
                        break;
                    case 6:
                        ip = read(param1, mode1) == 0 ? read(param2, mode2) : ip + 3;
                        break;
                    case 7:
                        write(param3, mode3, read(param1, mode1) < read(param2, mode2) ? 1 : 0);
                        ip += 4;
                        break;
                    case 8:
                        write(param3, mode3, read(param1, mode1) == read(param2, mode2) ? 1 : 0);
                        ip += 4;
                        break;
                    case 9:
                        relativeBase += read(param1, mode1);
                        ip += 2;
                        break;
                    default:
                        throw new IllegalArgumentException("Unknown opcode: " + opcode);
                }
            }
        }
    }

    private static class PaintingRobot {
        private Point pos = new Point(0, 0);
        private Direction dir = Direction.UP;
        private final Set<Point> painted = new HashSet<>();
        private final Set<Point> visited = new HashSet<>();

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

    private static long[] parse(String input) {
        return Arrays.stream(input.trim().split(","))
                .mapToLong(Long::parseLong)
                .toArray();
    }

    public long part1(String input) {
        IntcodeComputer program = new IntcodeComputer(parse(input), new long[0]);
        PaintingRobot robot = new PaintingRobot();

        while (program.isRunning) {
            program.run(new long[]{robot.isPaintedBelow() ? 1L : 0L});
            if (program.isRunning) {
                long color = program.getOutput();
                long turn = program.getOutput();
                robot.paint(color);
                robot.turn(turn == 1);
                robot.forward();
            }
        }

        return robot.visited.size();
    }

    public String part2(String input) {
        IntcodeComputer program = new IntcodeComputer(parse(input), new long[0]);
        PaintingRobot robot = new PaintingRobot();

        robot.paint(1); // paint panel below robot to white

        while (program.isRunning) {
            program.run(new long[]{robot.isPaintedBelow() ? 1L : 0L});
            if (program.isRunning) {
                long color = program.getOutput();
                long turn = program.getOutput();
                robot.paint(color);
                robot.turn(turn == 1);
                robot.forward();
            }
        }

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