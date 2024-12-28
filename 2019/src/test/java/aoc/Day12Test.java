package aoc;

import org.junit.jupiter.api.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.assertEquals;

class Day12Test {
    private static String example;
    private static String example2;
    private static String input;
    private Day12 day;

    @BeforeAll
    public static void init() throws IOException {
        example = Files.readString(Paths.get("src/main/resources/day12_example.txt"), StandardCharsets.UTF_8);
        example2 = Files.readString(Paths.get("src/main/resources/day12_example2.txt"), StandardCharsets.UTF_8);
        input = Files.readString(Paths.get("src/main/resources/day12.txt"), StandardCharsets.UTF_8);
    }

    @BeforeEach
    public void setup() {
        day = new Day12();
    }

    @Nested
    @DisplayName("Part 1")
    class Part1Tests {
        @Test
        void testExample() {
            long result = day.part1(example, 10);
            assertEquals(179L, result);
        }

        @Test
        void testExample2() {
            long result = day.part1(example2, 100);
            assertEquals(1940L, result);
        }

        @Test
        void testSolution() {
            long result = day.part1(input, 1000);
            assertEquals(10198L, result);
        }
    }

    @Nested
    @DisplayName("Part 2")
    class Part2Tests {
        @Test
        void testExample() {
            long result = day.part2(example);
            assertEquals(2772L, result);
        }

        @Test
        void testExample2() {
            long result = day.part2(example2);
            assertEquals(4686774924L, result);
        }

        @Test
        void testSolution() {
            long result = day.part2(input);
            assertEquals(271442326847376L, result);
        }
    }
}