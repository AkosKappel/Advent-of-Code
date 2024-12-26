package aoc;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Day08 {
    private static final int WIDTH = 25;
    private static final int HEIGHT = 6;

    private static final char WHITE = '█';
    private static final char BLACK = ' ';
    private static final char TRANSPARENT = '.';

    private static int[][][] parse(String input) {
        int numLayers = input.length() / (WIDTH * HEIGHT);
        int[][][] image = new int[HEIGHT][WIDTH][numLayers];

        for (int i = 0; i < numLayers; i++) {
            for (int j = 0; j < HEIGHT; j++) {
                for (int k = 0; k < WIDTH; k++) {
                    int digit = input.charAt(i * WIDTH * HEIGHT + j * WIDTH + k);
                    image[j][k][i] = digit - '0';
                }
            }
        }

        return image;
    }

    private static int getMinLayer(int[][][] image) {
        int minZeros = Integer.MAX_VALUE;
        int minLayer = 0;
        for (int layer = 0; layer < image[0][0].length; layer++) {
            int zeros = 0;
            for (int y = 0; y < HEIGHT; y++) {
                for (int x = 0; x < WIDTH; x++) {
                    if (image[y][x][layer] == 0) {
                        zeros++;
                    }
                }
            }

            if (zeros < minZeros) {
                minZeros = zeros;
                minLayer = layer;
            }
        }
        return minLayer;
    }

    private static long countDigit(int[][][] image, int digit, int layer) {
        long count = 0;
        for (int y = 0; y < HEIGHT; y++) {
            for (int x = 0; x < WIDTH; x++) {
                if (image[y][x][layer] == digit) {
                    count++;
                }
            }
        }
        return count;
    }

    public long part1(String input) {
        int[][][] image = parse(input);
        int minLayer = getMinLayer(image);
        long ones = countDigit(image, 1, minLayer);
        long twos = countDigit(image, 2, minLayer);
        return ones * twos;
    }

    public String part2(String input) {
        int[][][] image = parse(input);
        char[][] result = new char[HEIGHT][WIDTH];

        for (int layer = 0; layer < image[0][0].length; layer++) {
            for (int y = 0; y < HEIGHT; y++) {
                for (int x = 0; x < WIDTH; x++) {
                    if (layer == 0) {
                        result[y][x] = TRANSPARENT;
                    } else if (result[y][x] != TRANSPARENT) {
                        continue;
                    }

                    switch (image[y][x][layer]) {
                        case 0 -> result[y][x] = BLACK;
                        case 1 -> result[y][x] = WHITE;
                        case 2 -> result[y][x] = TRANSPARENT;
                    }
                }
            }
        }

        StringBuilder sb = new StringBuilder();
        for (int y = 0; y < HEIGHT; y++) {
            for (int x = 0; x < WIDTH; x++) {
                sb.append(result[y][x]);
            }
            sb.append(System.lineSeparator());
        }

        return sb.toString();
    }

    public static void main(String[] args) throws Exception {
        Day08 day = new Day08();
        String filepath = "src/main/resources/day08.txt";
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