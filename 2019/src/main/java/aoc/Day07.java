package aoc;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class Day07 {
    public long part1(String input) {
        long highestSignal = Long.MIN_VALUE;
        Permutations<Integer> permutations = new Permutations<>(new Integer[]{0, 1, 2, 3, 4});

        for (List<Integer> sequence : permutations) {
            List<IntcodeComputer> computers = new ArrayList<>();
            for (int phase : sequence) {
                IntcodeComputer computer = IntcodeComputer.fromString(input);
                computer.addInput(phase);
                computers.add(computer);
            }

            long outputSignal = 0;
            for (int i = 0; i < sequence.size(); i++) {
                computers.get(i).run(outputSignal);
                outputSignal = computers.get(i).readOutput();
            }

            highestSignal = Math.max(highestSignal, outputSignal);
        }

        return highestSignal;
    }

    public long part2(String input) {
        long highestSignal = Long.MIN_VALUE;
        Permutations<Integer> permutations = new Permutations<>(new Integer[]{5, 6, 7, 8, 9});

        for (List<Integer> sequence : permutations) {
            List<IntcodeComputer> computers = new ArrayList<>();
            for (int phase : sequence) {
                IntcodeComputer computer = IntcodeComputer.fromString(input);
                computer.addInput(phase);
                computers.add(computer);
            }

            long outputSignal = 0;

            cycle:
            while (true) {
                for (IntcodeComputer computer : computers) {
                    boolean finished = computer.run(outputSignal);
                    if (finished) break cycle;
                    outputSignal = computer.readOutput();
                }
            }

            highestSignal = Math.max(highestSignal, outputSignal);
        }

        return highestSignal;
    }

    public static void main(String[] args) throws Exception {
        Day07 day = new Day07();
        String filepath = "src/main/resources/day07.txt";
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