package aoc;

import java.awt.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Day17 {
    private static final char EMPTY = '.';
    private static final char SCAFFOLD = '#';

    private static String[] scanGrid(String input) {
        IntcodeComputer program = IntcodeComputer.fromString(input);
        program.setOutputSize(-1);
        program.run();
        String grid = program
                .getOutput()
                .stream()
                .map(x -> String.valueOf((char) x.intValue()))
                .collect(Collectors.joining(""));
        return grid.split("\n");
    }

    private static List<Point> findIntersections(String[] grid) {
        int height = grid.length, width = grid[0].length();
        List<Point> intersections = new LinkedList<>();

        for (int y = 1; y < height - 1; y++) {
            for (int x = 1; x < width - 1; x++) {
                if (grid[y].charAt(x) == EMPTY) continue;
                if (grid[y - 1].charAt(x) != SCAFFOLD) continue;
                if (grid[y + 1].charAt(x) != SCAFFOLD) continue;
                if (grid[y].charAt(x - 1) != SCAFFOLD) continue;
                if (grid[y].charAt(x + 1) != SCAFFOLD) continue;
                intersections.add(new Point(x, y));
            }
        }

        return intersections;
    }

    private static Map.Entry<Point, Direction> findVacuumRobot(String[] grid) {
        for (int y = 0; y < grid.length; y++) {
            for (int x = 0; x < grid[y].length(); x++) {
                char tile = grid[y].charAt(x);
                if (tile == SCAFFOLD) continue;
                if (tile == EMPTY) continue;

                Point position = new Point(x, y);
                Direction direction = switch (tile) {
                    case '^' -> Direction.UP;
                    case '>' -> Direction.RIGHT;
                    case 'v' -> Direction.DOWN;
                    case '<' -> Direction.LEFT;
                    default -> throw new IllegalStateException("Unexpected value: " + tile);
                };

                return Map.entry(position, direction);
            }
        }

        throw new IllegalStateException("No vacuum robot found");
    }

    private static char getTile(String[] grid, Point position) {
        int height = grid.length, width = grid[0].length();
        boolean inBoundsX = 0 <= position.x && position.x < width;
        boolean inBoundsY = 0 <= position.y && position.y < height;
        return (inBoundsX && inBoundsY) ? grid[position.y].charAt(position.x) : EMPTY;
    }

    private static String[] walk(String[] grid) {
        Map.Entry<Point, Direction> vacuumRobot = findVacuumRobot(grid);
        Point position = vacuumRobot.getKey();
        Direction direction = vacuumRobot.getValue();

        List<String> moves = new LinkedList<>();
        int steps = 0;

        while (true) {
            Point newPosition = direction.move(position);

            // go straight
            if (getTile(grid, newPosition) == SCAFFOLD) {
                steps++;
                position = newPosition;
                continue;
            }

            // try turn left
            Direction newDirection = direction.turnLeft();
            newPosition = newDirection.move(position);
            String turn = "L";

            if (getTile(grid, newPosition) != SCAFFOLD) {
                // try turn right
                newDirection = direction.turnRight();
                newPosition = newDirection.move(position);
                turn = "R";

                if (getTile(grid, newPosition) != SCAFFOLD) {
                    if (steps > 0) moves.add(String.valueOf(steps));
                    break; // reached end of path
                }
            }

            if (steps > 0) moves.add(String.valueOf(steps));
            moves.add(turn);

            position = newPosition;
            direction = newDirection;
            steps = 1;
        }

        return moves.toArray(new String[0]);
    }

    private static String[] findFunctions(String[] moves) {
        String[] functions = new String[3];

        for (int lengthA = 2; lengthA < 11; lengthA++) {
            String[] functionA = Arrays.copyOfRange(moves, 0, lengthA);
            int offsetB = lengthA;

            while (Arrays.equals(Arrays.copyOfRange(moves, offsetB, offsetB + lengthA), functionA)) {
                offsetB += lengthA;
            }

            for (int lengthB = 2; lengthB < 11; lengthB++) {
                String[] functionB = Arrays.copyOfRange(moves, offsetB, offsetB + lengthB);
                int offsetC = offsetB + lengthB;

                while (true) {
                    if (Arrays.equals(Arrays.copyOfRange(moves, offsetC, offsetC + lengthA), functionA)) {
                        offsetC += lengthA;
                    } else if (Arrays.equals(Arrays.copyOfRange(moves, offsetC, offsetC + lengthB), functionB)) {
                        offsetC += lengthB;
                    } else {
                        break;
                    }
                }

                for (int lengthC = 2; lengthC < 11; lengthC++) {
                    String[] functionC = Arrays.copyOfRange(moves, offsetC, offsetC + lengthC);

                    boolean valid = true;
                    int i = offsetC;
                    while (i < moves.length) {
                        if (Arrays.equals(Arrays.copyOfRange(moves, i, i + lengthA), functionA)) {
                            i += lengthA;
                        } else if (Arrays.equals(Arrays.copyOfRange(moves, i, i + lengthB), functionB)) {
                            i += lengthB;
                        } else if (Arrays.equals(Arrays.copyOfRange(moves, i, i + lengthC), functionC)) {
                            i += lengthC;
                        } else {
                            valid = false;
                            break;
                        }
                    }

                    if (valid) {
                        functions[0] = String.join(",", functionA);
                        functions[1] = String.join(",", functionB);
                        functions[2] = String.join(",", functionC);
                        if (functions[0].length() > 20 || functions[1].length() > 20 || functions[2].length() > 20) {
                            continue;
                        }
                        return functions;
                    }
                }
            }
        }

        throw new IllegalStateException("No solution found");
    }

    public long part1(String input) {
        String[] grid = scanGrid(input);
        List<Point> intersections = findIntersections(grid);
        return intersections.stream().mapToInt(p -> p.x * p.y).sum();
    }

    public long part2(String input) {
        String[] grid = scanGrid(input);
        String[] moves = walk(grid);

        String[] functions = findFunctions(moves);
        String mainFunction = String.join(",", moves)
                .replace(functions[0], "A")
                .replace(functions[1], "B")
                .replace(functions[2], "C");

        IntcodeComputer program = IntcodeComputer.fromString(input);
        program.setMemoryAt(0, 2);
        program.setOutputSize(-1);

        String instructions = String.format("%s\n%s\n%s\n%s\nn\n", mainFunction, functions[0], functions[1], functions[2]);
        for (char c : instructions.toCharArray()) {
            program.addInput((int) c);
        }

        program.run();
        return program.readLastOutput();
    }

    public static void main(String[] args) throws Exception {
        Day17 day = new Day17();
        String filepath = "src/main/resources/day17.txt";
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