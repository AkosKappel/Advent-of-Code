package aoc;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayDeque;
import java.util.HashMap;
import java.util.Queue;

public class Day14 {
    private record Chemical(String name, long amount) {
    }

    private record Reaction(Chemical[] inputs, Chemical output) {
    }

    private static HashMap<String, Reaction> parse(String input) {
        String[] lines = input.replaceAll("\r\n", "\n").split("\n");
        HashMap<String, Reaction> reactions = new HashMap<>();

        for (String line : lines) {
            String[] parts = line.split(" => ");
            String[] inputParts = parts[0].split(", ");
            String[] outputParts = parts[1].split(" ");

            Chemical[] inputs = new Chemical[inputParts.length];
            for (int i = 0; i < inputParts.length; i++) {
                String[] inputPart = inputParts[i].split(" ");
                inputs[i] = new Chemical(inputPart[1], Long.parseLong(inputPart[0]));
            }

            Chemical output = new Chemical(outputParts[1], Long.parseLong(outputParts[0]));
            reactions.put(output.name, new Reaction(inputs, output));
        }

        return reactions;
    }

    private long neededOre(Chemical wantedChemical, HashMap<String, Reaction> reactions) {
        long totalOre = 0;
        HashMap<String, Long> leftovers = new HashMap<>();
        Queue<Chemical> queue = new ArrayDeque<>();
        queue.add(wantedChemical);

        while (!queue.isEmpty()) {
            Chemical currentChemical = queue.poll();
            long neededAmount = currentChemical.amount;

            if (currentChemical.name.equals("ORE")) {
                totalOre += neededAmount;
                continue;
            }

            long leftover = leftovers.getOrDefault(currentChemical.name, 0L);
            if (leftover >= neededAmount) {
                leftovers.put(currentChemical.name, leftover - neededAmount);
                continue;
            }

            neededAmount -= leftover;
            leftovers.put(currentChemical.name, 0L);

            Reaction reaction = reactions.get(currentChemical.name);
            long numReactions = (long) Math.ceil((double) neededAmount / (double) reaction.output.amount);

            for (Chemical chemical : reaction.inputs) {
                queue.add(new Chemical(chemical.name, chemical.amount * numReactions));
            }

            long leftoverAmount = numReactions * reaction.output.amount - neededAmount;
            leftovers.put(currentChemical.name, leftoverAmount);
        }

        return totalOre;
    }

    public long part1(String input) {
        HashMap<String, Reaction> reactions = parse(input);
        Chemical target = new Chemical("FUEL", 1);
        return neededOre(target, reactions);
    }

    public long part2(String input) {
        final long availableOre = 1_000_000_000_000L;
        HashMap<String, Reaction> reactions = parse(input);

        long max = 2;
        while (neededOre(new Chemical("FUEL", max), reactions) < availableOre) {
            max *= 2;
        }

        long min = max / 2;
        while (max - min > 1) {
            long mid = (max + min) / 2;
            if (neededOre(new Chemical("FUEL", mid), reactions) < availableOre) {
                min = mid;
            } else {
                max = mid;
            }
        }

        return min;
    }

    public static void main(String[] args) throws Exception {
        Day14 day = new Day14();
        String filepath = "src/main/resources/day14.txt";
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