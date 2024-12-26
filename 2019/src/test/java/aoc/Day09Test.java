package aoc;

import org.junit.jupiter.api.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.assertEquals;

class Day09Test {
    private static String example;
    private static String example2;
    private static String example3;
    private static String input;
    private Day09 day;

    @BeforeAll
    public static void init() throws IOException {
        example = Files.readString(Paths.get("src/main/resources/day09_example.txt"), StandardCharsets.UTF_8);
        example2 = Files.readString(Paths.get("src/main/resources/day09_example2.txt"), StandardCharsets.UTF_8);
        example3 = Files.readString(Paths.get("src/main/resources/day09_example3.txt"), StandardCharsets.UTF_8);
        input = Files.readString(Paths.get("src/main/resources/day09.txt"), StandardCharsets.UTF_8);
    }

    @BeforeEach
    public void setup() {
        day = new Day09();
    }

    @Nested
    @DisplayName("Part 1")
    class Part1Tests {
        @Test
        void testExample() {
            String result = day.part1(example);
            assertEquals(example, result); // output is copy of itself
        }

        @Test
        void testExample2() {
            String result = day.part1(example2);
            assertEquals("1219070632396864", result);
        }

        @Test
        void testExample3() {
            String result = day.part1(example3);
            assertEquals("1125899906842624", result);
        }

        @Test
        void testSolution() {
            String result = day.part1(input);
            assertEquals("3507134798", result);
        }
    }

    @Nested
    @DisplayName("Part 2")
    class Part2Tests {
        @Test
        void testSolution() {
            long result = day.part2(input);
            assertEquals(84513L, result);
        }
    }
}