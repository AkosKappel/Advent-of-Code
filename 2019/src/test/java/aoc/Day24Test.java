package aoc;

import org.junit.jupiter.api.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.assertEquals;

class Day24Test {
    private static String example;
    private static String input;
    private Day24 day;

    @BeforeAll
    public static void init() throws IOException {
        example = Files.readString(Paths.get("src/main/resources/day24_example.txt"), StandardCharsets.UTF_8);
        input = Files.readString(Paths.get("src/main/resources/day24.txt"), StandardCharsets.UTF_8);
    }

    @BeforeEach
    public void setup() {
        day = new Day24();
    }

    @Nested
    @DisplayName("Part 1")
    class Part1Tests {
        @Test
        void testExample() {
            long result = day.part1(example);
            assertEquals(2129920L, result);
        }

        @Test
        void testSolution() {
            long result = day.part1(input);
            assertEquals(28778811L, result);
        }
    }

    @Nested
    @DisplayName("Part 2")
    class Part2Tests {
        @Test
        void testExample() {
            long result = day.part2(example);
            assertEquals(0L, result);
        }

        @Test
        void testSolution() {
            long result = day.part2(input);
            assertEquals(0L, result);
        }
    }
}