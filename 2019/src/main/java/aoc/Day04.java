package aoc;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Day04 {
    private static int[] parse(String input) {
        String[] values = input.trim().split("-");
        return new int[]{Integer.parseInt(values[0]), Integer.parseInt(values[1])};
    }

    public long part1(String input) {
        int[] range = parse(input);
        int start = range[0];
        int end = range[1];
        int number = start - 1;
        int numPasswords = 0;

        outer:
        while (number <= end) {
            String s = String.valueOf(++number);

            for (int i = 0; i < s.length() - 1; i++) {
                if (s.charAt(i) > s.charAt(i + 1)) {
                    continue outer;
                }
            }

            boolean hasRepeat = false;
            for (int i = 0; i < s.length() - 1; i++) {
                if (s.charAt(i) == s.charAt(i + 1)) {
                    hasRepeat = true;
                    break;
                }
            }
            if (!hasRepeat) continue;

            numPasswords++;
        }

        return numPasswords;
    }

    public long part2(String input) {
        int[] range = parse(input);
        int start = range[0];
        int end = range[1];
        int number = start - 1;
        int numPasswords = 0;

        outer:
        while (number <= end) {
            String s = String.valueOf(++number);

            for (int i = 0; i < s.length() - 1; i++) {
                if (s.charAt(i) > s.charAt(i + 1)) {
                    continue outer;
                }
            }

            boolean hasDouble = false;
            for (int i = 0; i < s.length() - 1; i++) {
                int repeatLength = 1;
                while (i < s.length() - 1 && s.charAt(i) == s.charAt(i + 1)) {
                    repeatLength++;
                    i++;
                }
                if (repeatLength == 2) {
                    hasDouble = true;
                    break;
                }
            }
            if (!hasDouble) continue;

            numPasswords++;
        }

        return numPasswords;
    }

    public static void main(String[] args) throws Exception {
        Day04 day = new Day04();
        String filepath = "src/main/resources/day04.txt";
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