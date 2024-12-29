package aoc;

import org.junit.jupiter.api.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.assertEquals;

class Day18Test {
    private static String example;
    private static String example2;
    private static String example3;
    private static String example4;
    private static String example5;
    private static String input;
    private Day18 day;

    @BeforeAll
    public static void init() throws IOException {
        example = Files.readString(Paths.get("src/main/resources/day18_example.txt"), StandardCharsets.UTF_8);
        example2 = Files.readString(Paths.get("src/main/resources/day18_example2.txt"), StandardCharsets.UTF_8);
        example3 = Files.readString(Paths.get("src/main/resources/day18_example3.txt"), StandardCharsets.UTF_8);
        example4 = Files.readString(Paths.get("src/main/resources/day18_example4.txt"), StandardCharsets.UTF_8);
        example5 = Files.readString(Paths.get("src/main/resources/day18_example5.txt"), StandardCharsets.UTF_8);
        input = Files.readString(Paths.get("src/main/resources/day18.txt"), StandardCharsets.UTF_8);
    }

    @BeforeEach
    public void setup() {
        day = new Day18();
    }

    @Nested
    @DisplayName("Part 1")
    class Part1Tests {
        @Test
        void testExample() {
            long result = day.part1(example);
            assertEquals(8L, result);
        }

        @Test
        void testExample2() {
            long result = day.part1(example2);
            assertEquals(86L, result);
        }

        @Test
        void testExample3() {
            long result = day.part1(example3);
            assertEquals(132L, result);
        }

        @Test
        void testExample4() {
            long result = day.part1(example4);
            assertEquals(136L, result);
        }

        @Test
        void testExample5() {
            long result = day.part1(example5);
            assertEquals(81L, result);
        }

        @Test
        void testSolution() {
            long result = day.part1(input);
            assertEquals(7430L, result);
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