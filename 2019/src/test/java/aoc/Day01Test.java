package aoc;

import org.junit.jupiter.api.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.assertEquals;

class Day01Test {
    private static String example;
    private static String input;
    private Day01 day;

    @BeforeAll
    public static void init() throws IOException {
        example = Files.readString(Paths.get("src/main/resources/day01_example.txt"), StandardCharsets.UTF_8);
        input = Files.readString(Paths.get("src/main/resources/day01.txt"), StandardCharsets.UTF_8);
    }

    @BeforeEach
    public void setup() {
        day = new Day01();
    }

    @Nested
    @DisplayName("Part 1")
    class Part1Tests {
        @Test
        void testExample() {
            long result = day.part1(example);
            assertEquals(34241L, result);
        }

        @Test
        void testSolution() {
            long result = day.part1(input);
            assertEquals(3297909L, result);
        }
    }

    @Nested
    @DisplayName("Part 2")
    class Part2Tests {
        @Test
        void testExample() {
            long result = day.part2(example);
            assertEquals(51316L, result);
        }

        @Test
        void testSolution() {
            long result = day.part2(input);
            assertEquals(4943994L, result);
        }
    }
}