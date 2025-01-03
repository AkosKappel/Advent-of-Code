package aoc;

import org.junit.jupiter.api.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.assertEquals;

class Day06Test {
    private static String example;
    private static String example2;
    private static String input;
    private Day06 day;

    @BeforeAll
    public static void init() throws IOException {
        example = Files.readString(Paths.get("src/main/resources/day06_example.txt"), StandardCharsets.UTF_8);
        example2 = Files.readString(Paths.get("src/main/resources/day06_example2.txt"), StandardCharsets.UTF_8);
        input = Files.readString(Paths.get("src/main/resources/day06.txt"), StandardCharsets.UTF_8);
    }

    @BeforeEach
    public void setup() {
        day = new Day06();
    }

    @Nested
    @DisplayName("Part 1")
    class Part1Tests {
        @Test
        void testExample() {
            long result = day.part1(example);
            assertEquals(42L, result);
        }

        @Test
        void testSolution() {
            long result = day.part1(input);
            assertEquals(295936L, result);
        }
    }

    @Nested
    @DisplayName("Part 2")
    class Part2Tests {
        @Test
        void testExample2() {
            long result = day.part2(example2);
            assertEquals(4L, result);
        }

        @Test
        void testSolution() {
            long result = day.part2(input);
            assertEquals(457L, result);
        }
    }
}