package aoc;

import java.awt.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

public class Day13 {
    private static final int EMPTY = 0;
    private static final int WALL = 1;
    private static final int BLOCK = 2;
    private static final int PADDLE = 3;
    private static final int BALL = 4;

    private void drawScreen(Map<Point, Integer> tiles) {
        int minX = tiles.keySet().stream().mapToInt(p -> p.x).min().orElse(0);
        int maxX = tiles.keySet().stream().mapToInt(p -> p.x).max().orElse(0);
        int minY = tiles.keySet().stream().mapToInt(p -> p.y).min().orElse(0);
        int maxY = tiles.keySet().stream().mapToInt(p -> p.y).max().orElse(0);

        StringBuilder sb = new StringBuilder();

        for (int y = minY; y <= maxY; y++) {
            for (int x = minX; x <= maxX; x++) {
                int tile = tiles.getOrDefault(new Point(x, y), EMPTY);
                char c = switch (tile) {
                    case EMPTY -> ' ';
                    case WALL -> '█';
                    case BLOCK -> '#';
                    case PADDLE -> '=';
                    case BALL -> 'o';
                    default -> throw new IllegalStateException("Unexpected value: " + tile);
                };
                sb.append(c);
            }
            sb.append("\n");
        }

        System.out.println(sb);
    }

    public long part1(String input) {
        IntcodeComputer program = IntcodeComputer.fromString(input);
        program.setOutputSize(3);

        Map<Point, Integer> tiles = new HashMap<>();
        while (program.isRunning()) {
            boolean finished = program.run();
            if (finished) break;

            long x = program.readOutput();
            long y = program.readOutput();
            long tileId = program.readOutput();
            tiles.put(new Point((int) x, (int) y), (int) tileId);
        }

        drawScreen(tiles);
        return tiles.entrySet().stream().filter(e -> e.getValue() == BLOCK).count();
    }

    public long part2(String input) {
        IntcodeComputer program = IntcodeComputer.fromString(input);
        program.setMemoryAt(0, 2);
        program.setOutputSize(3);

        Point ball = null;
        Point paddle = null;
        long score = 0;

        while (program.isRunning()) {
            if (ball != null && paddle != null) {
                int direction = Integer.compare(ball.x, paddle.x);
                int times = Math.max(1, Math.abs(ball.x - paddle.x));

                program.clearInput();
                for (int i = 0; i < times; i++) {
                    program.addInput(direction);
                }
            }

            boolean finished = program.run();
            if (finished) break;

            long x = program.readOutput();
            long y = program.readOutput();
            long id = program.readOutput();

            if (x == -1 && y == 0) {
                score = id;
                continue;
            }

            switch ((int) id) {
                case BALL -> ball = new Point((int) x, (int) y);
                case PADDLE -> paddle = new Point((int) x, (int) y);
            }
        }

        return score;
    }

    public static void main(String[] args) throws Exception {
        Day13 day = new Day13();
        String filepath = "src/main/resources/day13.txt";
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