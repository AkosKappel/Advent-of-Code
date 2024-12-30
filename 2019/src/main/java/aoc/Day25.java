package aoc;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Day25 {
    private static final boolean PRINT = false;
    private static final boolean INTERACTIVE = false;

    private static String runCommand(IntcodeComputer computer, String command) {
        if (!command.endsWith("\n")) command += "\n";
        computer.addInput(command);
        computer.run();
        String output = computer.readAsciiOutput();

        if (PRINT) {
            System.out.println("> " + command);
            System.out.println(output);
        }

        return output;
    }

    public long part1(String input) {
        IntcodeComputer computer = IntcodeComputer.fromString(input);
        if (INTERACTIVE) {
            computer.runInteractive();
            return 0;
        }

        computer.setWaitForInput(true);

        String[] commands = {
                "south", "take space law space brochure",
                "south", "take mouse",
                "south", "take astrolabe",
                "south", "take mug",
                "north", "north", "west", "north", "north", "take wreath",
                "south", "south", "east", "north", "west", "take sand",
                "north", "take manifold",
                "south", "west", "take monolith",
                "west",
                "drop space law space brochure",
                "drop monolith",
                "drop manifold",
                "drop mouse",
                "west",
        };

        String response = null;
        for (String command : commands)
            response = runCommand(computer, command);

        String password = response.replaceAll("[^0-9]", "");
        return Long.parseLong(password);
    }

    public static void main(String[] args) throws Exception {
        Day25 day = new Day25();
        String filepath = "src/main/resources/day25.txt";
        String input = Files.readString(Paths.get(filepath), StandardCharsets.UTF_8);

        long startPart1 = System.currentTimeMillis();
        long resultPart1 = day.part1(input);
        long endPart1 = System.currentTimeMillis();
        System.out.println("Part 1: " + resultPart1 + " (" + (endPart1 - startPart1) + " ms)");
    }
}