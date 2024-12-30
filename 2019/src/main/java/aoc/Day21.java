package aoc;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Queue;

public class Day21 {
    private static long executeScript(String code, String springScript) {
        IntcodeComputer program = IntcodeComputer.fromString(code);
        program.addInput(
                springScript
                        .chars()
                        .mapToLong(c -> c)
                        .toArray()
        );

        program.run();

        Queue<Long> output = program.getOutput();
        while (!output.isEmpty()) {
            long out = output.poll();
            if (output.isEmpty()) return out;
            System.out.print((char) out); // message from the spring-droid
        }

        throw new IllegalStateException("No solution found");
    }

    public long part1(String input) {
        return executeScript(input, String.join("\n", new String[]{
                "NOT A J",
                "NOT J J",
                "AND B J",
                "AND C J",
                "NOT J J",
                "AND D J",
                "WALK"
        }) + "\n");
    }

    public long part2(String input) {
        return executeScript(input, String.join("\n", new String[]{
                "NOT C J",
                "AND H J",
                "NOT B T",
                "OR T J",
                "NOT A T",
                "OR T J",
                "AND D J",
                "RUN"
        }) + "\n");
    }

    public static void main(String[] args) throws Exception {
        Day21 day = new Day21();
        String filepath = "src/main/resources/day21.txt";
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