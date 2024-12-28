package aoc;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Day16 {
    private static int[] parse(String input) {
        String[] chars = input.split("");
        int[] digits = new int[chars.length];
        for (int i = 0; i < chars.length; i++) {
            digits[i] = Integer.parseInt(chars[i]);
        }
        return digits;
    }

    public long part1(String input) {
        int[] digits = parse(input);

        for (int repeat = 0; repeat < 100; repeat++) {
            int[] newDigits = new int[digits.length];

            for (int i = 0; i < digits.length; i++) {
                int j = i;
                int step = i + 1;

                int total = 0;

                while (j < digits.length) {
                    for (int k = j; k < j + step && k < digits.length; k++) {
                        total += digits[k];
                    }
                    j += 2 * step;

                    for (int k = j; k < j + step && k < digits.length; k++) {
                        total -= digits[k];
                    }
                    j += 2 * step;
                }

                newDigits[i] = Math.abs(total) % 10;
            }

            digits = newDigits;
        }

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 8; i++) sb.append(digits[i]);
        return Long.parseLong(sb.toString());
    }

    public long part2(String input) {
        int[] digits = parse(input);
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < 7; i++) sb.append(digits[i]);
        int toSkip = Integer.parseInt(sb.toString());
        assert toSkip > digits.length / 2;

        final int repeated = 10_000;
        int[] newDigits = new int[digits.length * repeated];
        for (int i = 0; i < digits.length * repeated; i++) {
            newDigits[i] = digits[i % digits.length];
        }

        digits = new int[newDigits.length - toSkip];
        for (int i = 0; i < digits.length; i++) {
            digits[i] = newDigits[i + toSkip];
        }

        for (int repeat = 0; repeat < 100; repeat++) {
            int cumSum = 0;
            for (int i = digits.length - 1; i >= 0; i--) {
                cumSum += digits[i];
                digits[i] = cumSum % 10;
            }
        }

        sb.setLength(0);
        for (int i = 0; i < 8; i++) sb.append(digits[i]);
        return Long.parseLong(sb.toString());
    }

    public static void main(String[] args) throws Exception {
        Day16 day = new Day16();
        String filepath = "src/main/resources/day16.txt";
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