package aoc;

import org.junit.jupiter.api.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.assertEquals;

class Day02Test {
    private static String input;
    private Day02 day;

    @BeforeAll
    public static void init() throws IOException {
        input = Files.readString(Paths.get("src/main/resources/day02.txt"), StandardCharsets.UTF_8);
    }

    @BeforeEach
    public void setup() {
        day = new Day02();
    }

    @Nested
    @DisplayName("Part 1")
    class Part1Tests {
        @Test
        void testSolution() {
            long result = day.part1(input);
            assertEquals(2782414L, result);
        }
    }

    @Nested
    @DisplayName("Part 2")
    class Part2Tests {
        @Test
        void testSolution() {
            long result = day.part2(input);
            assertEquals(9820L, result);
        }
    }
}