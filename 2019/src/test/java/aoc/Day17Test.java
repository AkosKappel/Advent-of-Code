package aoc;

import org.junit.jupiter.api.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.assertEquals;

class Day17Test {
    private static String input;
    private Day17 day;

    @BeforeAll
    public static void init() throws IOException {
        input = Files.readString(Paths.get("src/main/resources/day17.txt"), StandardCharsets.UTF_8);
    }

    @BeforeEach
    public void setup() {
        day = new Day17();
    }

    @Nested
    @DisplayName("Part 1")
    class Part1Tests {
        @Test
        void testSolution() {
            long result = day.part1(input);
            assertEquals(4408L, result);
        }
    }

    @Nested
    @DisplayName("Part 2")
    class Part2Tests {
        @Test
        void testSolution() {
            long result = day.part2(input);
            assertEquals(0L, result);
        }
    }
}